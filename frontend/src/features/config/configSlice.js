import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import configService from "./configService";

// Fetch config
export const fetchConfig = createAsyncThunk(
  "config/fetchConfig",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await configService.getConfig(token);
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

// Create or update config
export const createOrUpdateConfig = createAsyncThunk(
  "config/createOrUpdateConfig",
  async (configData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await configService.createOrUpdateConfig(configData, token);
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
  config: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Slice
const configSlice = createSlice({
  name: "config",
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
      // Fetch config
      .addCase(fetchConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.config = action.payload[0];
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Create or update config
      .addCase(createOrUpdateConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrUpdateConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.config = action.payload;
      })
      .addCase(createOrUpdateConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = configSlice.actions;
export default configSlice.reducer;