import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  REQUEST_POSTS,
  REQUEST_USER,
  CHECK_ACCESS,
  CREATE_POST,
  UPDATE_USER,
  ERROR,
} from './actions/types';
import {
  requestPosts,
  setAccess,
  setPosts,
  setLoader,
  setUser,
  setMe,
} from './actions/actions';

const SERVER_URL = 'http://localhost:8000';
const SERVER_AUTH_PREFIX = 'Bearer';

const axiosLogin = axios.create({
  method: 'post',
  baseURL: `${SERVER_URL}/auth/token/`,
});
const axiosPosts = axios.create({
  baseURL: `${SERVER_URL}/posts`,
});
const axiosUser = axios.create({
  baseURL: `${SERVER_URL}/users`,
});

export function* sagaWatcher() {
  yield takeEvery(LOGIN_USER, loginUserWorker);
  yield takeEvery(REGISTER_USER, registrationWorker);
  yield takeEvery(REQUEST_POSTS, getPostsWorker);
  yield takeEvery(REQUEST_USER, getUserWorker);
  yield takeEvery(CHECK_ACCESS, checkAccessWorker);
  yield takeEvery(CREATE_POST, createPostWorker);
  yield takeEvery(UPDATE_USER, updateUserWorker);
}

async function executeAxios(customAxios = axios, config = {}) {
  try {
    const response = await customAxios(config);
    return response.data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
      case 401:
        return {
          type: ERROR,
          payload: {
            isErrorOccurred: true,
            status: error.response.status,
            text: error.response.data.detail,
          },
        }
    }
  }
}

// =============================  LOGIN  =============================

function* loginUserWorker({ data }) {
  const response = yield call(executeAxios, axiosLogin, {data});
  if (response.type === ERROR) {
    yield put(response);
    return
  }
  const user = {
    id: response.id,
    full_name: response.full_name,
    avatar: response.avatar,
  }
  yield put(setMe(user));
  
  const access = {
    ...response,
    isGranted: true,
  }
  yield put(setAccess(access));
}

// =============================  REGISTRATION  =============================

function* registrationWorker({ data }) {
  const config = {
    method: 'post',
    url: '/',
    data,
  }
  const response = yield call(executeAxios, axiosUser, config);
  if (response.type === ERROR) {
    yield put(response);
    return
  }
  yield put({
    type: LOGIN_USER,
    data: {
      email: data.email,
      password: data.password,
    }
  })
}

// =============================  POSTS  =============================

function* getPostsWorker({ filter }) {
  yield put(setLoader(true)); // show loader
  const accessToken = yield select(state => state.access.access);
  const config = {
    url: filter,
    headers: {
      'Authorization': `${SERVER_AUTH_PREFIX} ${accessToken}`,
    },
  };
  const response = yield call(executeAxios, axiosPosts, config);
  yield put(setPosts(response));
  yield put(setLoader(false)); // hide loader
}

// =============================  USER  =============================

function* getUserWorker({ id }) {
  const accessToken = yield select(state => state.access.access);
  const config = {
    url: `/${id}`,
    headers: {
      'Authorization': `${SERVER_AUTH_PREFIX} ${accessToken}`,
    },
  };
  const response = yield call(executeAxios, axiosUser, config);
  yield put(setUser(response));
}

// =============================  USER UPDATE  =============================

function* updateUserWorker({id, data}) {
  const myID = yield select(state => state.me.id);
  const accessToken = yield select(state => state.access.access);
  const form = new FormData();
  if (data.email) form.append('email', data.email);
  if (data.username) form.append('full_name', data.username);
  if (data.avatar) form.append('avatar', data.avatar);
  if (data.password) form.append('password', data.password);
  const config = {
    method: 'patch',
    url: `/${id}/`,
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${SERVER_AUTH_PREFIX} ${accessToken}`,
    },
  }
  const response = yield call(executeAxios, axiosUser, config);
  if (response.type === ERROR) {
    yield put(response);
    return
  }
  if ('success' in response) {
    const userConfig = {
      url: `/${id}`,
      headers: {
        'Authorization': `${SERVER_AUTH_PREFIX} ${accessToken}`,
      },
    }
    const user = yield call(executeAxios, axiosUser, userConfig);
    if (id == myID) yield put(setMe(user));
    yield put(setUser(user));
  }
}

// ============================= CHECK ACCESS =============================

function* checkAccessWorker() {
  const isGranted = yield select(state => state.access.isGranted);
  if (!isGranted) {
    const access = JSON.parse(localStorage.getItem('access'));
    const user = {
      id: access.id,
      full_name: access.full_name,
      avatar: access.avatar,
    }
    yield put(setMe(user));
    yield put(setAccess(access));
  }
}

// ============================= CREATE POST  =============================

function* createPostWorker({data}) {
  const myID = yield select(state => state.me.id);

  const form = new FormData();
  form.append('title', data.title);
  form.append('content', data.content);
  form.append('image', data.image);
  form.append('author_id', myID);
  form.append('tags', data.tags);

  const accessToken = yield select(state => state.access.access);

  const config = {
    method: 'post',
    url: '/',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${SERVER_AUTH_PREFIX} ${accessToken}`,
    }
  }
  const response = yield call(executeAxios, axiosPosts, config);
  yield put(requestPosts(`/?filter=api_user_id&search=${myID}`));
}

// ============================= ERROR HANDLING =============================

