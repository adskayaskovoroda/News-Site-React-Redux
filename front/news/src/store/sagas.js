import { takeEvery, put, call } from 'redux-saga/effects';
import {
  GET_POSTS,
  REQUEST_POSTS,
} from './actions/types';
import axios from 'axios'; 

const SERVER_URL = 'http://127.0.0.1:8000';

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker() {
  const payload = yield call(fetchPosts);
  yield put({
    type: GET_POSTS,
    payload,
  });
}

async function fetchPosts() {
  const response = await axios.get(SERVER_URL);
  return response.data;
}