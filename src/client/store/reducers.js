import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as form } from 'redux-form';

// Modules - import each module to be mounted on redux store
import account from './modules/account';

export default history => combineReducers({
  router: connectRouter(history),
  form, // reduxForm must be named 'form'
  // mount your modules here
  account,
});
