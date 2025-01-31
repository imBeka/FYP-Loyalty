import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      required: true,
      enum: ['purchase', 'redemption'],
    },
    amount: {
      type: Number,
      required: true
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
    pointsRedeemed: {
      type: Number,
      default: 0,
    },
    rewardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Reward',
    },
    description: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
