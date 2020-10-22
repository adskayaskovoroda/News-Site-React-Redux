import DEV_DATA from '../dev_data';
import {
  GET_POSTS,
  REQUEST_POSTS,
} from './types';

export function getPosts(id) {
  if (id) return {
    type: GET_POSTS,
    payload: [DEV_DATA.find(el => el.id === id)],
  }
  return {
    type: GET_POSTS,
    payload: DEV_DATA,
  }
}

export function requestPosts() {
  return {
    type: REQUEST_POSTS,
  }
}