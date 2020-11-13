import {
  CHANGE_LOADER,
  CHECK_ACCESS,
  LOGIN_USER,
  REQUEST_POSTS,
  SET_ACCESS,
  SET_POSTS,
  SET_USER,
  REQUEST_USER,
  SET_ME,
  REGISTER_USER,
  UPDATE_USER,
  CREATE_POST,
} from './types';

export function loginUser(data) {
  return {
    type: LOGIN_USER,
    data,
  };
}

export function registerUser(data) {
  return {
    type: REGISTER_USER,
    data,
  }
}

export function setAccess(payload) {
  return {
    type: SET_ACCESS,
    payload,
  }
}

export function requestPosts(filter = '') {
  return {
    type: REQUEST_POSTS,
    filter,
  }
}

export function setPosts(payload) {
  return {
    type: SET_POSTS,
    payload,
  }
}

export function checkAccess() {
  return {
    type: CHECK_ACCESS
  }
}

export function setLoader(value) {
  return {
    type: CHANGE_LOADER,
    payload: value,
  }
}

export function setUser(userData) {
  return {
    type: SET_USER,
    payload: userData,
  }
}

export function requestUser(id) {
  return {
    type: REQUEST_USER,
    id,
  }
}

export function setMe(userData) {
  return {
    type: SET_ME,
    payload: userData,
  }
}

export function updateUser(id, data) {
  return {
    type: UPDATE_USER,
    id,
    data,
  }
}

export function createPost(data) {
  return {
    type: CREATE_POST,
    data,
  }
}