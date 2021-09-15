import { SET_ME } from "../actions/types";
import { loadingStatus } from "../actions/actions";

const initialState = {
    data: null,
    loading: loadingStatus.NONE
}

export default function meReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ME:
            return { ...state, ...action.payload }
        
        default:
            return state
    }
}
