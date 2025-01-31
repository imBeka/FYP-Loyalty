import asyncHandler from 'express-async-handler';
import Reward from '../models/rewardModel.js';

// @desc    Create a new reward
// @route   POST /api/rewards
// @access  Private/Admin
const createReward = asyncHandler(async (req, res) => {
    const { name, description, pointsRequired } = req.body;

    if (!name || !description || !pointsRequired) {
        res.status(400);
        throw new Error('Please provide all required fields: name, description, pointsRequired');
    }

    const reward = await Reward.create({
        name,
        description,
        pointsRequired,
    });

    res.status(201).json(reward);
});

// @desc    Get all rewards
// @route   GET /api/rewards
// @access  Public
const getAllRewards = asyncHandler(async (req, res) => {
    const rewards = await Reward.find({});
    res.json(rewards);
});

// @desc    Get reward by ID
// @route   GET /api/rewards/:id
// @access  Public
const getRewardById = asyncHandler(async (req, res) => {
    const reward = await Reward.findById(req.params.id);

    if (reward) {
        res.json(reward);
    } else {
        res.status(404);
        throw new Error('Reward not found');
    }
});

// @desc    Update a reward
// @route   PUT /api/rewards/:id
// @access  Private/Admin
const updateRewardById = asyncHandler(async (req, res) => {
    const reward = await Reward.findById(req.params.id);

    if (reward) {
        reward.name = req.body.name || reward.name;
        reward.description = req.body.description || reward.description;
        reward.pointsRequired = req.body.pointsRequired || reward.pointsRequired;

        const updatedReward = await reward.save();
        res.json(updatedReward);
    } else {
        res.status(404);
        throw new Error('Reward not found');
    }
});

// @desc    Delete a reward
// @route   DELETE /api/rewards/:id
// @access  Private/Admin
const deleteRewardById = asyncHandler(async (req, res) => {
    const reward = await Reward.deleteOne({ _id: req.params.id});

    if (reward) {
        res.json({ message: 'Reward removed' });
    } else {
        res.status(404);
        throw new Error('Reward not found');
    }
});

export {
    createReward,
    getAllRewards,
    getRewardById,
    updateRewardById,
    deleteRewardById,
};