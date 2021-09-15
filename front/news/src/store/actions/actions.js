import {
    SIGN_IN,
    SIGN_UP,
    OAUTH,
    FETCH_POSTS,
    FETCH_USER,
    FETCH_ME,
    CREATE_POST,
    UPDATE_USER,

    SET_ME,
    SET_POSTS,
    SET_SUBMITTING_STATUS,
    SET_USER,
} from './types'

export function signIn(email, password) {
    return {
        type: SIGN_IN,
        payload: {
            email,
            password
        }
    }
}

export function signUp(payload) {
    return {
        type: SIGN_UP,
        payload
    }
}

export function oauth(token) {
    return {
        type: OAUTH,
        payload: {
            token
        }
    }
}

export function fetchPosts(search, filter) {
    return {
        type: FETCH_POSTS,
        payload: {
            search,
            filter
        }
    }
}

export function fetchUser(id) {
    return {
        type: FETCH_USER,
        payload: {
            id
        }
    }
}

export function fetchMe() {
    return {
        type: FETCH_ME,
    }
}

export function createPost(payload) {
    return {
        type: CREATE_POST,
        payload
    }
}

export function updateUser(id, diff) {
    return {
        type: UPDATE_USER,
        payload: {
            id,
            diff
        }
    }
}

export function setMe(payload) {
    return {
        type: SET_ME,
        payload,
    }
}

export function setPosts(payload) {
    return {
        type: SET_POSTS,
        payload
    }
}

export const submittingStatus = Object.freeze({
    NONE: null,
    START: 'start',
    OK: 'ok',
    ERROR: 'error'
})

export function setSubmittingStatus(payload) {
    return {
        type: SET_SUBMITTING_STATUS,
        payload
    }
}

export function setUser(payload) {
    return {
        type: SET_USER,
        payload
    }
}

export const loadingStatus = Object.freeze({
    NONE: null,
    LOADING: 'loading',
    ERROR: 'error',
    OK: 'ok',
})
