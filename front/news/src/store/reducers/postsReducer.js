import { GET_POSTS } from '../actions/types';

export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POSTS:
      return [...action.payload];

    default:
      return state
  };
}
