import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/rootReducer';
import { sagaWatcher } from './sagas';

const saga = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(saga)
));

saga.run(sagaWatcher)

export default store;