import capitalize from 'lodash.capitalize'
import { put } from '@redux-saga/core/effects'
import { setSubmittingStatus, submittingStatus } from '../store/actions/actions'
import history from './history'

const TOKEN_TYPE = process.env.REACT_APP_TOKEN_TYPE

export function difference(initial, values) {
    const diff = {...values}
    
    for (const key in initial) {
        if (!(key in values))
            diff[key] = null
        else if (initial[key] === diff[key])
            delete diff[key]
    }

    return diff
}

export function authHeader(token) {
    return {
        'Authorization': `${TOKEN_TYPE} ${token}`
    }
}

export function firstError(details) {
    const firstFieldName = Object.getOwnPropertyNames(details)[0]
    return capitalize(details[firstFieldName][0])
}

export function logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    history.replace('/signin')
}

export function setAccess(access, refresh) {
    localStorage.setItem('accessToken', access)
    localStorage.setItem('refreshToken', refresh)
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken'))
}

export function handleDefaultErrors(response) {
    switch (response.status) {
        case 500:
            return {
                ok: false,
                handler: function* () {
                    logout()
                    yield put(setSubmittingStatus({
                        status: submittingStatus.ERROR,
                        message: 'Server is not responding'
                    }))
                }
            }
        default:
            return {
                ok: false,
                handler: function* () {
                    if (!(history.location.pathname === '/signin' || history.location.pathname === '/signup'))
                        logout()
                    yield put(setSubmittingStatus({
                        status: submittingStatus.ERROR,
                        message: 'Something went wrong...'
                    }))
                }
            }
    }
} 
