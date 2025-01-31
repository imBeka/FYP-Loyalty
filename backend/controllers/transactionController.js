import asyncHandler from 'express-async-handler';
import Transaction from '../models/transactionModel.js';
import User from '../models/userModel.js';
import Reward from '../models/rewardModel.js';
import PointsConfiguration from '../models/systemConfigModel.js';

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private/Admin
const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({});
    res.json(transactions);
});

// @desc    Get all transactions of a given user by email
// @route   GET /api/transactions/user/:email
// @access  Private/Admin
const getAllTransactionsByUserEmail = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    const transactions = await Transaction.find({ userId: user._id });
    res.json(transactions);
});

// @desc    Creates a transaction to redeem points for a reward
// @route   POST /api/transactions/redeem
// @access  Private
const addTransactionRedeem = asyncHandler(async (req, res) => {
    const { email, rewardId, description } = req.body;

    if (!email || !rewardId) {
        res.status(400);
        throw new Error('Invalid data provided');
    }

    // Fetch the user by email
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Fetch the reward
    const reward = await Reward.findById(rewardId);
    if (!reward) {
        res.status(404);
        throw new Error('Reward not found');
    }

    // Check if the user has enough points
    if (user.points < reward.pointsRequired) {
        res.status(400);
        throw new Error('Insufficient points to redeem this reward');
    }

    // Create the redemption transaction
    const transaction = await Transaction.create({
        userId: user._id,
        type: 'redemption',
        pointsRedeemed: reward.pointsRequired,
        rewardId,
        description,
    });

    // Deduct points from the user
    user.points -= reward.pointsRequired;
    await user.save();

    res.status(201).json(transaction);
});

// @desc    Creates a transaction to earn points
// @route   POST /api/transactions/earn
// @access  Private
const addTransactionEarn = asyncHandler(async (req, res) => {
    const { email, amount, description } = req.body;

    if (!email || !amount) {
        res.status(400);
        throw new Error('Invalid data provided');
    }

    // Fetch the user by email
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Fetch the points configuration
    const pointsConfig = await PointsConfiguration.findOne({});
    if (!pointsConfig) {
        res.status(404);
        throw new Error('Points configuration not found');
    }

    // Calculate points earned
    const pointsEarned = Math.floor((amount / pointsConfig.unitAmount) * pointsConfig.pointsPerUnit);

    // Create the earn transaction
    const transaction = await Transaction.create({
        userId: user._id,
        type: 'purchase',
        amount,
        pointsEarned,
        description,
    });

    // Add points to the user
    user.points += pointsEarned;
    await user.save();

    res.status(201).json(transaction);
});

// @desc    Get transaction by ID
// @route   GET /api/transactions/:id
// @access  Private/Admin
const getTransactionById = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private/Admin
const updateTransactionById = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (transaction) {
        transaction.userId = req.body.userId || transaction.userId;
        transaction.amount = req.body.amount || transaction.amount;
        transaction.pointsEarned = req.body.pointsEarned || transaction.pointsEarned;
        transaction.pointsRedeemed = req.body.pointsRedeemed || transaction.pointsRedeemed;
        transaction.type = req.body.type || transaction.type;
        transaction.description = req.body.description || transaction.description;
        transaction.rewardId = req.body.rewardId || transaction.rewardId;

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});

export {
    getAllTransactions,
    getAllTransactionsByUserEmail,
    addTransactionRedeem,
    addTransactionEarn,
    getTransactionById,
    updateTransactionById,
};