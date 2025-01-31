import express from 'express';
import {
    createReward,
    getAllRewards,
    getRewardById,
    updateRewardById,
    deleteRewardById,
} from '../controllers/rewardController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getAllRewards);
router.route('/:id').get(getRewardById);

// Admin-protected routes
router.route('/').post(protect, admin, createReward);
router.route('/:id').put(protect, admin, updateRewardById);
router.route('/:id').delete(protect, admin, deleteRewardById);

export default router;