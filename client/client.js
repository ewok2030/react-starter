import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store';

// Containers (i.e. the React component where we'll manage state)
import Layout from './containers/Layout';
import Tasks from './containers/Tasks';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={Layout} >
            <IndexRoute component={Tasks} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

// Inject the React App into the div wit ID 'app'
ReactDOM.render(<App />, document.getElementById('app'));
