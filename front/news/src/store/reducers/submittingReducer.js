import { SET_SUBMITTING_STATUS } from '../actions/types';
import { submittingStatus } from '../actions/actions';

const initialState = {
    status: submittingStatus.NONE,
    message: null
}

export default function submittingReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SUBMITTING_STATUS:
            return {...state, ...action.payload}

        default:
            return state
    }
}
