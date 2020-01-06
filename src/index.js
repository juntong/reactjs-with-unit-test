import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import App from './App';
import Login from './pages/login/Login';
import './index.css';
import * as serviceWorker from './serviceWorker';
import initialStore from './redux';

ReactDOM.render(
  <Provider store={initialStore()}>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            return <div>Home</div>;
          }}
        />
        <Route
          path="/products"
          component={() => {
            return <div>products</div>;
          }}
        />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
