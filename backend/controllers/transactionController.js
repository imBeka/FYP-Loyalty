import asyncHandler from 'express-async-handler';
import Transaction from '../models/transactionModel.js';
import User from '../models/userModel.js';

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private/Admin
const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({});
    res.json(transactions);
})

// @desc    Get all transactions of given user
// @route   GET /api/transactions/user/:id
// @access  Private/Admin
const getAllTransactionsByUserId = asyncHandler(async (req, res) => {
    const user = req.params.id;
    const transactions = await Transaction.find({user});
    res.json(transactions);
})


// @desc    Creates a transaction to redeem points
// @route   GET /api/transactions/redeem
// @access  Private
const addTransactionRedeem = asyncHandler(async (req, res) => {
    const { userId, points, description, } = req.body;

    if(!userId || !points) {
        throw new Error('Invalid data provided');
    }

    const transaction = await Transaction.create({
        user: userId, 
        points, 
        description,
        type: "redeem",

    });

    const user = await User.findById(userId);
    user.points -= points;
    await user.save();

    res.status(201);
    res.json(transaction);
})

// @desc    Creates a transaction to earn points
// @route   GET /api/transactions/earn
// @access  Private
const addTransactionEarn = asyncHandler(async (req, res) => {
    const { userId, points, description, } = req.body;

    if(!userId || !points) {
        throw new Error('Invalid data provided');
    }

    const transaction = await Transaction.create({
        user: userId, 
        points, 
        description,
        type: "earn",

    });

    const user = await User.findById(userId);
    user.points += points;
    await user.save();

    res.status(201);
    res.json(transaction);
})

// @desc    Get transaction by ID
// @route   GET /api/transactions/:id
// @access  Private/Admin
const getTransactionById = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
  
    if (transaction) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('Transaction not found')
    }
  })
  
  // @desc    Update transaction
  // @route   PUT /api/transactions/:id
  // @access  Private/Admin
  const updateTransactionById = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
  
    if (transaction) {
        transaction.user = req.body.user || transaction.user
        transaction.points = req.body.points || transaction.points
        transaction.type = req.body.type || transaction.type
        transaction.description = req.body.description || transaction.description
  
      const updatedTransaction = await transaction.save()
  
      res.json(updatedTransaction)
    } else {
      res.status(404)
      throw new Error('Transaction not found')
    }
  })


export {
    getAllTransactions,
    getAllTransactionsByUserId,
    addTransactionRedeem,
    addTransactionEarn,
    getTransactionById,
    updateTransactionById,
}