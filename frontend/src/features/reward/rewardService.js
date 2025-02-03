import axios from "axios";

const API_URL = "/api/rewards/";

// Get all rewards
const getAllRewards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get reward by ID
const getRewardById = async (rewardId) => {
  const response = await axios.get(API_URL + rewardId);
  return response.data;
};

// Create a new reward (admin only)
const createReward = async (rewardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, rewardData, config);
  return response.data;
};

// Update reward by ID (admin only)
const updateRewardById = async (rewardId, rewardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + rewardId, rewardData, config);
  return response.data;
};

// Delete reward by ID (admin only)
const deleteRewardById = async (rewardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + rewardId, config);
  return response.data;
};

const rewardService = {
  getAllRewards,
  getRewardById,
  createReward,
  updateRewardById,
  deleteRewardById,
};

export default rewardService;