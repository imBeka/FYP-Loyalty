import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import transactionReducer from '../features/transaction/transactionSlice';
import rewardReducer from '../features/reward/rewardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    reward: rewardReducer
  },
});
