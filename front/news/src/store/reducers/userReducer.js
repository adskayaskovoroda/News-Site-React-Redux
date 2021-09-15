import { SET_USER } from '../actions/types';
import { loadingStatus } from '../actions/actions';

const initialState = {
    data: null,
    loading: loadingStatus.NONE
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.payload }

        default:
            return state
    }
}
