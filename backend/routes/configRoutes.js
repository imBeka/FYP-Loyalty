import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    createConfig,
    getConfig,
    updateConfig
} from '../controllers/configController.js'

const router = express.Router();

router.post('/', protect, admin, createConfig);
router.get('/', protect, admin, getConfig);
router.put('/', protect, admin, updateConfig)

export default router;
