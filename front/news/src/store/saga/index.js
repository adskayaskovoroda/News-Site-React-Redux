import { takeEvery } from 'redux-saga/effects';
import {
    SIGN_IN,
    SIGN_UP,
    OAUTH,
    FETCH_POSTS,
    FETCH_USER,
    FETCH_ME,
    CREATE_POST,
    UPDATE_USER,
} from '../actions/types';
import signInWorker from './signInSaga';
import signUpWorker from './signUpSaga';
import oauthWorker from './oauthSaga';
import fetchPostsWorker from './fetchPostsSaga';
import fetchUserWorker from './fetchUserSaga';
import fetchMeWorker from './fetchMeSaga';
import createPostWorker from './createPostSaga';
import updateUserWorker from './updateUserSaga';

export default function* rootSaga() {
    yield takeEvery(SIGN_IN, signInWorker)
    yield takeEvery(SIGN_UP, signUpWorker)
    yield takeEvery(OAUTH, oauthWorker)
    yield takeEvery(FETCH_POSTS, fetchPostsWorker)
    yield takeEvery(FETCH_USER, fetchUserWorker)
    yield takeEvery(FETCH_ME, fetchMeWorker)
    yield takeEvery(CREATE_POST, createPostWorker)
    yield takeEvery(UPDATE_USER, updateUserWorker)
}
