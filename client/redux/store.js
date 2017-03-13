import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

// Modules - import each module to be mounted on redux store
import device from './modules/device';

const middleware = applyMiddleware(promise(), thunk, logger());

/*
  Create the store by combining reducers from each module
  Each reducer will be mounted at store.<reducerName>
*/
const reducer = combineReducers({
  device,
});

export default createStore(reducer, middleware);
