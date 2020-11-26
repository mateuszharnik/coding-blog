import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { routes } from '@client/helpers/constants';
import Dashboard from '@client/views/Admin/Dashboard';

class AdminPage extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render = () => (
    <>
      <div className="mb-2">AdminPage is ready!</div>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path={routes.ADMIN} exact component={Dashboard} />
          <Redirect from="*" to={routes.NOT_FOUND} />
        </Switch>
      </Suspense>
    </>
  )
}

export default AdminPage;
