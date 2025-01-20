import asyncHandler from 'express-async-handler';
import Reward from '../models/rewardModel.js';

// @desc    Get all rewards
// @route   GET /api/rewards
// @access  Public
const getAllRewards = asyncHandler(async (req, res) => {
    const rewards = await Reward.find({});
    res.json(rewards);
})

// @desc    Get reward by id
// @route   GET /api/rewards/:id
// @access  Public
const getRewardById = asyncHandler(async (req, res) => {
    const reward = await Reward.findById(req.params.id);
    if(!reward) {
        res.status(404);
        throw new Error("Reward not found");
    }

    res.json(reward);
})


//  @desc   Creates new reward
//  @route  POST /api/rewards/create
//  @access Private/Admin
const createReward = asyncHandler(async (req, res) => {
    const { name, description, pointsRequired, isActive } = req.body;
    if(!name || !description || !pointsRequired) {
        throw new Error('Insufficient data provided');
    }

    const newReward = await Reward.create({
        name,
        description,
        pointsRequired,
        isActive: isActive ? isActive : false
    })

    res.json(newReward)
})

  // @desc    Update reward
  // @route   PUT /api/rewards/:id
  // @access  Private/Admin
  const updateRewardById = asyncHandler(async (req, res) => {
    const reward = await Reward.findById(req.params.id);
  
    if (reward) {
        reward.name = req.body.name || reward.name
        reward.pointsRequired = req.body.pointsRequired || reward.pointsRequired
        reward.description = req.body.description || reward.description
        reward.isActive = req.body.isActive || reward.isActive
  
      const updatedReward = await reward.save()
  
      res.json(updatedReward)
    } else {
      res.status(404)
      throw new Error('Reward not found')
    }
  })

// @desc    Delete reward
// @route   DELETE /api/reward/:id
// @access  Private/Admin
const deleteReward = asyncHandler(async (req, res) => {
    const reward = await Reward.findById(req.params.id)
  
    if (reward) {
      await reward.remove()
      res.json({ message: 'Reward removed' })
    } else {
      res.status(404)
      throw new Error('Reward not found')
    }
  })

export {
    getAllRewards,
    getRewardById,
    updateRewardById,
    createReward,
    deleteReward
}