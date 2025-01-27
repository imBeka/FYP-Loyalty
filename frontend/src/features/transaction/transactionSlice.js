import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";

const initialState = {
    transactions: [],
    transaction: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// create transaction Earn
export const createTransactionEarn = createAsyncThunk(
    'transaction/createEarn',
    async (transactionData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await transactionService.createTransactionEarn(transactionData, token)
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// create transaction Redeem
export const createTransactionRedeem = createAsyncThunk(
    'transaction/createRedeem',
    async (transactionData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await transactionService.createTransactionRedeem(transactionData, token)
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTransactions = createAsyncThunk(
    'transaction/getAll',
    async (thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await transactionService.getTransactions(token)
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTransactionById = createAsyncThunk(
    'transaction/getById',
    async (transactionId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await transactionService.getTransactionById(transactionId, token)
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllTransactionsByUserId = createAsyncThunk(
    'transaction/getAllByUserId',
    async (userId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await transactionService.getAllTransactionsByUserId(userId, token)
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updatedTransaction = createAsyncThunk(
    'transaction/update',
    async (transactionData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await transactionService.updatedTransaction(transactionData, token)
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
            builder
                .addCase(createTransactionEarn.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(createTransactionEarn.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.transactions.push(action.payload)
                })
                .addCase(createTransactionEarn.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(createTransactionRedeem.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(createTransactionRedeem.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.transactions.push(action.payload)
                })
                .addCase(createTransactionRedeem.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(getTransactions.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getTransactions.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.transactions = action.payload
                })
                .addCase(getTransactions.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(getTransactionById.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getTransactionById.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.transaction = action.payload
                })
                .addCase(getTransactionById.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(getAllTransactionsByUserId.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getAllTransactionsByUserId.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.transactions = action.payload
                })
                .addCase(getAllTransactionsByUserId.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(updatedTransaction.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(updatedTransaction.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.transaction = action.payload
                })
                .addCase(updatedTransaction.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
        }
})

export const {reset} = transactionSlice.actions
export default transactionSlice.reducer