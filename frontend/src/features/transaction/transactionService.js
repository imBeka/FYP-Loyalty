import axios from "axios";

const API_URL = '/api/transactions'

const createTransactionEarn = async (transactionData, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL+'/earn', transactionData, config)

    return response.data
}

const createTransactionRedeem = async (transactionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL+'/redeem', transactionData, config)

    return response.data
}

const getTransactions = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL+'/', config)

    return response.data
}

const getTransactionById = async (transactionId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(`${API_URL}/${transactionId}`, config)

    return response.data
}

const updatedTransaction = async (transactionData, token) => {    

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(`${API_URL}/${transactionData._id}`, transactionData, config)

    return response.data
}

const getAllTransactionsByUserId = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(`${API_URL}/user/${userId}`, config)

    return response.data
}

const transactionService = {
    createTransactionEarn,
    createTransactionRedeem,
    getTransactionById,
    getTransactions,
    updatedTransaction,
    getAllTransactionsByUserId,
}

export default transactionService