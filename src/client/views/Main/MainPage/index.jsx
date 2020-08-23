import React, { Component, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '@client/views/Main/Home';

const Contact = lazy(() => import('@client/views/Main/Contact'));
const Posts = lazy(() => import('@client/views/Main/Posts'));
const Post = lazy(() => import('@client/views/Main/Post'));
const About = lazy(() => import('@client/views/Main/About'));

class MainPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="mb-2">MainPage is ready!</div>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/o-mnie" exact component={About} />
            <Route path="/kontakt" exact component={Contact} />
            <Route path="/posty" exact component={Posts} />
            <Route path="/posty/:id" exact component={Post} />
            <Redirect from="*" to="/404" />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default MainPage;
