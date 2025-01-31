import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    addTransactionRedeem,
    addTransactionEarn,
    getAllTransactions,
    getTransactionById,
    updateTransactionById,
    getAllTransactionsByUserEmail
} from "../controllers/transactionController.js"

const router = express.Router();

router.post('/redeem', protect, addTransactionRedeem);
router.post('/earn', protect, admin, addTransactionEarn);
router.get('/', protect, admin, getAllTransactions);
router
    .route('/:id')
    .get(protect, admin, getTransactionById)
    .put(protect, admin, updateTransactionById);
router.get('/user/:email', protect, admin, getAllTransactionsByUserEmail);

export default router;
