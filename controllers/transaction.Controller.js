import { Transaction } from "../models/Transaction.js";
import { Subscription } from "../models/Subscription.js";

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, paymentDate, subscriptionId } = req.body;

    // Check if the subscription exists
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({
        status: 'fail',
        message: 'Subscription not found',
      });
    }

    // Create the transaction
    const newTransaction = await Transaction.create({
      amount,
      paymentDate,
      subscriptionId,
    });

    res.status(201).json({
      status: 'success',
      message: 'Transaction created successfully',
      data: {
        newTransaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('subscriptionId');
    res.status(200).json({
      status: 'success',
      data: {
        transactions,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get a specific transaction
const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('subscriptionId');
    if (!transaction) {
      return res.status(404).json({
        status: 'fail',
        message: 'Transaction not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export { createTransaction, getAllTransactions, getTransaction };
