import Axios from 'axios';
import { authHeader, logout } from '../utils/utils';

const axios = Axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
})

const REJECT_MESSAGE = {
    message: 'invalid session',
    response: {
        data: {
            message: 'invalid session',
        },
    },
};

async function refreshAccess(refreshToken) {
    const response = await axios({
        method: 'post',
        url: '/auth/token/refresh/',
        data: {
            refresh: refreshToken,
        },
    })
    return response.data.access
}

function promiseLogout() {
    logout()
    return Promise.reject(REJECT_MESSAGE)
}

axios.interceptors.request.use(({ headers, ...config }) => {
    const accessToken = localStorage.getItem('accessToken')
    return {
        ...config,
        headers: {
            ...headers,
            ...(accessToken && config.withAuth ? authHeader(accessToken) : {})
        }
    }
}, error => Promise.reject(error))

axios.interceptors.response.use(response => response,
    async function (error) {
        if (!error.response)
            return Promise.reject({
                message: error.message,
                response: {
                    status: 500,
                },
            })

        if (error.response?.data?.detail !== 'Given token not valid for any token type')
            return Promise.reject(error)

        try {
            const refreshToken = localStorage.getItem('refreshToken')
            localStorage.setItem('accessToken', await refreshAccess(refreshToken))
        } catch (error) {
            return promiseLogout()
        }

        try {
            return await axios(error.config)
        } catch (error) {
            return promiseLogout()
        }
    }
)

export default axios
