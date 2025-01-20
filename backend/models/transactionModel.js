import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ['earn', 'redeem'],
    },
    description: {
      type: String,
    },
    transactionDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // orderReference: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Order',
    // },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
