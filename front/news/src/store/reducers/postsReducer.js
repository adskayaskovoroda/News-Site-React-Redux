import { GET_POSTS } from '../actions/types';

const initialState = []

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;

    default:
      return state
  };
}
