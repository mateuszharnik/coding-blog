import React, { Component, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import MainPage from '@client/views/Main/MainPage';
import './index.scss';

const NotFound = lazy(() => import('@client/views/Main/NotFound'));
const AdminPage = lazy(() => import('@client/views/Admin/AdminPage'));
const Login = lazy(() => import('@client/views/Auth/Login'));

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/zaloguj" exact component={Login} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/404" exact component={NotFound} />
            <Route path="/" component={MainPage} />
            <Redirect from="*" to="/404" />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
