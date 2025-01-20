import mongoose from "mongoose";

const rewardSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      pointsRequired: {
        type: Number,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Reward = mongoose.model('Reward', rewardSchema);
  
  export default Reward;
  