import {
  REQUEST_POSTS,
} from './types';

export function requestPosts(url = '') {
  return {
    type: REQUEST_POSTS,
    url,
  }
}