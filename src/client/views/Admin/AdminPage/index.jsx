import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '@client/views/Admin/Dashboard';

class AdminPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="mb-2">AdminPage is ready!</div>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/admin" exact component={Dashboard} />
            <Redirect from="*" to="/404" />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default AdminPage;
