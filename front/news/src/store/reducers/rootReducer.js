import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer';
import { loaderReducer } from './loaderReducer';

export default combineReducers({
  posts: postsReducer,
  showLoader: loaderReducer,
});
