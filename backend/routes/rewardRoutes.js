import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { createReward, deleteReward, getAllRewards, getRewardById, updateRewardById } from '../controllers/rewardController.js'

const router = express.Router();

router.get('/', getAllRewards);
router.post('/create', protect, admin, createReward);
router.route('/:id')
                    .get(getRewardById)
                    .put(protect, admin, updateRewardById)
                    .delete(protect, admin, deleteReward)

export default router;