import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer';
import { loaderReducer } from './loaderReducer';
import { accessReducer } from './accessReducer';
import { userReducer } from './userReducer';
import { meReducer } from './meReducer';
import { errorReducer } from './errorReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  posts: postsReducer,
  showLoader: loaderReducer,
  access: accessReducer,
  user: userReducer,
  me: meReducer,
  error: errorReducer,
  form: formReducer,
});
