import React, { Component, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { routes } from '@client/helpers/constants';
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
      <Router basename={process.env.BASE_URL}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path={routes.LOGIN} exact component={Login} />
            <Route path={routes.ADMIN} component={AdminPage} />
            <Route path={routes.NOT_FOUND} exact component={NotFound} />
            <Route path={routes.HOME} component={MainPage} />
            <Redirect from="*" to={routes.NOT_FOUND} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
