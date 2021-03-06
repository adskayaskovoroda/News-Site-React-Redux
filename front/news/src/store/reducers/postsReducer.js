import { SET_POSTS } from '../actions/types';

const initialState = null;

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.payload;

    default:
      return state
  };
}
