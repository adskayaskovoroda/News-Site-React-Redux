import { SET_ME } from '../actions/types';

const initialState = null;

export const meReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ME:
      return action.payload;

    default:
      return state
  };
}
