import { combineReducers } from 'redux';
import meReducer from './meReducer';
import postsReducer from './postsReducer';
import submittingReducer from './submittingReducer';
import userReducer from './userReducer'

export default combineReducers({
    me: meReducer,
    posts: postsReducer,
    submitting: submittingReducer,
    user: userReducer,
})
