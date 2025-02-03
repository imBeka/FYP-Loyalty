import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rewardService from "./rewardService.js";

// Fetch all rewards
export const fetchAllRewards = createAsyncThunk(
  "rewards/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await rewardService.getAllRewards();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch reward by ID
export const fetchRewardById = createAsyncThunk(
  "rewards/fetchById",
  async (rewardId, thunkAPI) => {
    try {
      return await rewardService.getRewardById(rewardId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create a new reward (admin only)
export const createNewReward = createAsyncThunk(
  "rewards/create",
  async (rewardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await rewardService.createReward(rewardData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update reward by ID (admin only)
export const updateReward = createAsyncThunk(
  "rewards/update",
  async ({ rewardId, rewardData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await rewardService.updateRewardById(rewardId, rewardData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete reward by ID (admin only)
export const deleteReward = createAsyncThunk(
  "rewards/delete",
  async (rewardId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await rewardService.deleteRewardById(rewardId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  rewards: [],
  reward: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Slice
const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all rewards
      .addCase(fetchAllRewards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllRewards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rewards = action.payload;
      })
      .addCase(fetchAllRewards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Fetch reward by ID
      .addCase(fetchRewardById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRewardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reward = action.payload;
      })
      .addCase(fetchRewardById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Create reward
      .addCase(createNewReward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewReward.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rewards.push(action.payload);
      })
      .addCase(createNewReward.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update reward
      .addCase(updateReward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReward.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rewards = state.rewards.map((reward) =>
          reward._id === action.payload._id ? action.payload : reward
        );
      })
      .addCase(updateReward.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete reward
      .addCase(deleteReward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReward.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rewards = state.rewards.filter(
          (reward) => reward._id !== action.payload._id
        );
      })
      .addCase(deleteReward.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = rewardSlice.actions;
export default rewardSlice.reducer;