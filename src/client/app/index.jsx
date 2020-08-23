import React, { Component, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Link, Redirect, Route, Switch,
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
        <div className="container my-2">
          <div className="mb-2">
            <Link className="mr-2" to="/">Home</Link>
            <Link className="mr-2" to="/o-mnie">About</Link>
            <Link className="mr-2" to="/kontakt">Contact</Link>
            <Link className="mr-2" to="/posty">Posty</Link>
            <Link className="mr-2" to="/posty/123">Post</Link>
            <Link className="mr-2" to="/zaloguj">Login</Link>
            <Link className="mr-2" to="/admin">Admin</Link>
            <Link to="/sadfsd">NotFound</Link>
          </div>
          <div className="mb-2">App is ready!</div>
          <Suspense fallback={<div />}>
            <Switch>
              <Route path="/zaloguj" exact component={Login} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/404" exact component={NotFound} />
              <Route path="/" component={MainPage} />
              <Redirect from="*" to="/404" />
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
