import React, { Component, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '@client/views/Main/Home';
import NavBar from '@client/components/NavBar';
import { routes } from '@client/helpers/constants';

const Contact = lazy(() => import('@client/views/Main/Contact'));
const Posts = lazy(() => import('@client/views/Main/Posts'));
const Post = lazy(() => import('@client/views/Main/Post'));
const About = lazy(() => import('@client/views/Main/About'));

class MainPage extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render = () => (
    <>
      <header className="header">
        <NavBar />
      </header>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path={routes.HOME} exact component={Home} />
          <Route path={routes.ABOUT} exact component={About} />
          <Route path={routes.CONTACT} exact component={Contact} />
          <Route path={routes.POSTS} exact component={Posts} />
          <Route path={routes.POST} exact component={Post} />
          <Redirect from="*" to={routes.NOT_FOUND} />
        </Switch>
      </Suspense>
    </>
  )
}

export default MainPage;
