import { User } from "../models/User.js"; 
const Subscription = require('../models/Subscription');
const Transaction = require('../models/Transaction');

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

const getStats = async (req, res, next) => { 
    try {
        const totalUsers = await User.countDocuments();
        const totalSubscriptions = await Subscription.countDocuments();
        const totalMonthlyRevenue = await Subscription.aggregate([
            { $match: { billingCycle: 'monthly' } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);
        // const trasactionUser=await Transaction.aggregate([
        //   {$match : {_id,amount }},
        //   { $group:'$subscriptionId' }
        // ])

        console.log(trasactionUser)
        res.json({
            stats: {
                totalUsers,
                totalSubscriptions,
                totalMonthlyRevenue: totalMonthlyRevenue[0]?.total || 0 ,
                // data: [
                //   {
                //     name: 234,
                //     id: 34,
                //     transactions: [

                //     ]
                //   },

                // ]
            }
        });
    } catch (error) {
        next(error);  
    }
};

export { getAllUsers,getStats };
