import { takeEvery, put, call } from 'redux-saga/effects';
import {
  GET_POSTS,
  REQUEST_POSTS,
} from './actions/types';
import axios from 'axios'; 

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker() {
  const payload = yield call(fetchPosts);
  console.log(payload);
  yield put({
    type: GET_POSTS,
    payload,
  });
}

async function fetchPosts() {
  const response = await axios.get('http://jsonplaceholder.typicode.com/posts?_limit=5');
  return response.data;
}