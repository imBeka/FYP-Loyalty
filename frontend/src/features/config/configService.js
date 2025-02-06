import axios from "axios";

const API_URL = "/api/config/";

// Get config
const getConfig = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create or update config
const createOrUpdateConfig = async (configData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL, configData, config);
  return response.data;
};

const configService = {
  getConfig,
  createOrUpdateConfig,
};

export default configService;