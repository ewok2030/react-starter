import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';

// Containers (i.e. the React component where we'll manage state)
import Root from './containers/Root';
import Home from './containers/Home';

// Create browser history to use in the Redux store
const baseUrl = (document.getElementsByTagName('base')[0] || {}).href;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

class Client extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Root>
            <Route exact path="/" component={Home} />
          </Root>
        </ConnectedRouter>
      </Provider>
    );
  }
}

// Inject the React App into the div wit ID 'app'
ReactDOM.render(<Client />, document.getElementById('client'));

module.hot.accept();
