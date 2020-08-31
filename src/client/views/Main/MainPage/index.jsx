import React, { Component, lazy, Suspense } from 'react';
import {
  Link, Redirect, Route, Switch,
} from 'react-router-dom';
import { routes } from '@client/helpers/constants';
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
        <div className="container my-2">
          <div className="mb-2">
            <Link className="mr-2" to={routes.HOME}>
              Home
            </Link>
            <Link className="mr-2" to={routes.ABOUT}>
              About
            </Link>
            <Link className="mr-2" to={routes.CONTACT}>
              Contact
            </Link>
            <Link className="mr-2" to={routes.POSTS}>
              Posts
            </Link>
            <Link className="mr-2" to={`${routes.POSTS}/123`}>
              Post
            </Link>
            <Link className="mr-2" to={routes.LOGIN}>
              Login
            </Link>
            <Link className="mr-2" to={routes.ADMIN}>
              Admin
            </Link>
            <Link to={routes.NOT_FOUND}>NotFound</Link>
          </div>
        </div>
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
    );
  }
}

export default MainPage;
