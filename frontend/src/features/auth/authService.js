import axios from 'axios'

const API_URL = '/api/users/'

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const getAllUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const updateUserByEmail = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL+userData.email, userData, config)

    return response.data
}

const authService = {
    register,
    logout,
    login,
    getAllUsers,
    updateUserByEmail
}

export default authService