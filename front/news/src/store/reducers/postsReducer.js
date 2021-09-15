import { SET_POSTS } from '../actions/types';
import { loadingStatus } from '../actions/actions';

const initialState = {
    data: [],
    loading: loadingStatus.NONE
}

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            return { ...state, ...action.payload }

        default:
            return state
    }
}
