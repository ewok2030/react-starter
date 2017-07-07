import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { reducer as form } from 'redux-form';

// Modules - import each module to be mounted on redux store
import task from './modules/task';

const middleware = applyMiddleware(promise(), thunk, logger());

/*
  Create the store by combining reducers from each module
  Each reducer will be mounted at store.<reducerName>
*/
const reducer = combineReducers({
  form, // really important redux-form's reducer is named 'form' on the store
  task,
});

export default createStore(reducer, middleware);
