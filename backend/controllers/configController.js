import asyncHandler from 'express-async-handler';
import PointsConfiguration from '../models/systemConfigModel.js';

// @desc    Create a new configuration for the system
// @route   POST /api/config/
// @access  Private/Admin
const createConfig = asyncHandler(async (req, res) => {
    const { pointsPerUnit, unitAmount } = req.body;

    if (!pointsPerUnit || !unitAmount) {
        res.status(400);
        throw new Error('Please provide all required fields: pointsPerUnit, unitAmount');
    }

    let config = await PointsConfiguration.find();
    
    if(config.length >= 1) {
        res.status(400);
        throw new Error('Config already exist, you can only modify existing one');
    }

    config = await PointsConfiguration.create({
        pointsPerUnit,
        unitAmount
    });

    res.status(201).json(config);
});

// @desc    Get the configuration of the system
// @route   GET /api/config/
// @access  Private/Admin
const getConfig = asyncHandler(async (req, res) => {
    const config = await PointsConfiguration.find();
    res.status(200).json(config);
})

// @desc    Update the configuration of the system
// @route   UPDATE /api/config/
// @access  Private/Admin
const updateConfig = asyncHandler(async (req, res) => {
    const config = await PointsConfiguration.findOne();

    if (config) {
        config.pointsPerUnit = req.body.pointsPerUnit || config.pointsPerUnit;
        config.unitAmount = req.body.unitAmount || config.unitAmount;

        const updatedConfig = await config.save();
        res.json(updatedConfig);
    } else {
        res.status(404);
        throw new Error('Config not found');
    }
})


export {
    createConfig,
    getConfig,
    updateConfig
}