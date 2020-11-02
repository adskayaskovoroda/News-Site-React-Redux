import { CHANGE_LOADER } from '../actions/types';

const initialState = false

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOADER:
      return action.payload;

    default:
      return state
  };
}
