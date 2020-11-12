import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer';
import { loaderReducer } from './loaderReducer';
import { accessReducer } from './accessReducer';
import { userReducer } from './userReducer';
import { meReducer } from './meReducer';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  posts: postsReducer,
  showLoader: loaderReducer,
  access: accessReducer,
  user: userReducer,
  me: meReducer,
  form: formReducer,
});
