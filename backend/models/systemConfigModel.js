import mongoose from "mongoose";

const configSchema = mongoose.Schema(
    {
      pointsPerUnit: {
        type: Number,
        required: true,
      },
      unitAmount: {
        type: Number,
        default: 1,
        required: true,
      },
    },
    {
      timestamps: true,
    }
);

const PointsConfiguration = mongoose.model('PointsConfiguration', configSchema);

export default PointsConfiguration;
