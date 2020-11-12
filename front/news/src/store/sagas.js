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

// =============================  LOGIN  =============================

async function login(data) {
  const response = await axiosLogin({data});
  return response.data;
}

function* loginUserWorker({ data }) {
  const response = yield call(login, data);
  const user = {
    id: response.id,
    full_name: response.full_name,
    avatar: response.avatar,
  }
  console.log(user)
  yield put(setMe(user));
  
  const access = {
    ...response,
    isGranted: true,
  }
  yield put(setAccess(access));
}

// =============================  REGISTRATION  =============================

async function register(data) {
  const response = await axiosUser({
    method: 'post',
    url: '/',
    data,
  });
  return response.data;
}

function* registrationWorker({ data }) {
  const response = yield call(register, data);
  yield put({
    type: LOGIN_USER,
    data: {
      email: data.email,
      password: data.password,
    }
  })
}

// =============================  POSTS  =============================

async function getPosts(config) {
  const response = await axiosPosts(config);
  return response.data;
}

function* getPostsWorker({ filter }) {
  yield put(setLoader(true)); // show loader
  const accessToken = yield select(state => state.access.access);
  const config = {
    url: filter,
    headers: {
      'Authorization': `${SERVER_AUTH_PREFIX} ${accessToken}`,
    },
  };
  const response = yield call(getPosts, config);
  yield put(setPosts(response));
  yield put(setLoader(false)); // hide loader
}

// =============================  USER  =============================

async function getUser(config) {
  const response = await axiosUser(config);
  return response.data;
}

function* getUserWorker({ id }) {
  const accessToken = yield select(state => state.access.access);
  const config = {
    url: `/${id}`,
    headers: {
      'Authorization': `${SERVER_AUTH_PREFIX} ${accessToken}`,
    },
  };
  const response = yield call(getUser, config);
  yield put(setUser(response));
}

// =============================  USER UPDATE  =============================

async function updateUser(config) {
  const response = await axiosUser(config);
  return response.data;
}

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
  console.log(id, myID);
  const response = yield call(updateUser, config);
  if ('success' in response) {
    console.log('success');
    const userConfig = {
      url: `/${id}`,
      headers: {
        'Authorization': `${SERVER_AUTH_PREFIX} ${accessToken}`,
      },
    }
    const user = yield call(getUser, userConfig);
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
      avatar: `${SERVER_URL}${access.avatar}`,
    }
    yield put(setMe(user));
    yield put(setAccess(access));
  }
}

// ============================= CREATE POST  =============================

async function createPost(config) {
  const response = await axiosPosts(config);
  return response.data;
}

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
  const response = yield call(createPost, config);
  yield put(requestPosts(`/?filter=api_user_id&search=${myID}`));
}

// ============================= ERROR HANDLING =============================
// TODO