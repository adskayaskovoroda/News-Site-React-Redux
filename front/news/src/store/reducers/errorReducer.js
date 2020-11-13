import { ERROR } from '../actions/types';

const initialState = {
    isErrorOccurred: false,
}

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return action.payload;

    default:
      return state
  };
}
