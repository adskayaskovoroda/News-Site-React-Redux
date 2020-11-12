import { SET_ACCESS } from '../actions/types';

const initialState = {
    isGranted: false,
    access: null,
    refresh: null,
}

export const accessReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS:
      localStorage.setItem('access', JSON.stringify(action.payload));
      return action.payload;

    default:
      return state
  };
}
