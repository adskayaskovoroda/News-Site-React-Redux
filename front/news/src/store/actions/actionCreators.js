import {
  REQUEST_POSTS,
  CHANGE_LOADER,
} from './types';

export function requestPosts(url = '') {
  return {
    type: REQUEST_POSTS,
    url,
  }
}

export function changeLoader(value) {
  return {
    type: CHANGE_LOADER,
    payload: value,
  }
}
