import { User } from "../models/User.js"; 
import {Subscription} from "../models/Subscription.js";
import {Transaction} from "../models/Transaction.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      data: { users }
    });

  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

const getUserById = async (req, res)=>{
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({
        status:"fail",
        message:"User not Found",
      });
    }
    res.status(200).json({
      status: "succes",
      data: {user},
    });
  } catch (error) {
    res.status(500).json({
      status:"fail",
      message:error.message,
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, 
        runValidators: true,
      }
    );
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

const getStats = async (req, res, next) => { 
    try {
        const totalUsers = await User.countDocuments();
        const totalSubscriptions = await Subscription.countDocuments();

        const totalMonthlyRevenue = await Subscription.aggregate([
            { $match: { billingCycle: 'monthly' } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);
        const usersWithTransactions = await User.aggregate([
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "userId",
              as: "subscriptions"
            }
          },
          {
            $unwind: {
              path: "$subscriptions",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: "transactions",
              localField: "subscriptions._id",
              foreignField: "subscriptionId",
              as: "transactions"
            }
          },
          {
            $group: {
              _id: "$_id",
              name: { $first: "$name" },
              email: { $first: "$email" },
              transactions: { $push: "$transactions" }
            }
          },
          {
            $project: {
              name: 1,
              email: 1,
              transactions: {
                $reduce: {
                  input: "$transactions",
                  initialValue: [],
                  in: { $concatArrays: ["$$value", "$$this"] }
                }
              }
            }
          }
        ]);
        res.json({
            stats: {
                totalUsers,
                totalSubscriptions,
                totalMonthlyRevenue: totalMonthlyRevenue[0]?.total || 0,
                usersWithTransactions
            }
        });

    } catch (error) {
        next(error);  
    }
};

export { getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getStats, };
