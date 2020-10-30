import { takeEvery, put, call } from 'redux-saga/effects';
import {
  GET_POSTS,
  REQUEST_POSTS,
} from './actions/types';
import {
  changeLoader
} from './actions/actionCreators';
import axios from 'axios'; 

const SERVER_URL = 'http://127.0.0.1:8000';

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker(action) {
  yield put(changeLoader(true));
  const payload = yield call(fetchPosts, action.url);
  yield put({
    type: GET_POSTS,
    payload,
  });
  yield put(changeLoader(false));
}

async function fetchPosts(url) {
  const response = await axios.get(SERVER_URL + url);
  return response.data;
}