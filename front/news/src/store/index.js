import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { loadingStatus, submittingStatus } from './actions/actions';
import rootReducer from './reducers/rootReducer';
import rootSaga from './saga';

const initialState = {
    me: {
        data: null,
        loading: loadingStatus.NONE
    },
    posts: {
        data: [],
        loading: loadingStatus.NONE
    },
    user: {
        data: null,
        loading: loadingStatus.NONE
    },
    submitting: {
        status: submittingStatus.NONE,
        message: null
    },
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga)

export default store;
