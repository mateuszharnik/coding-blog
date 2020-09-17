import PropTypes from 'prop-types';
import React, { Component, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthorsLength } from '@client/store/NavBar/actions';
import { routes } from '@client/helpers/constants';
import Home from '@client/views/Main/Home';
import NavBar from '@client/components/NavBar';

const Contact = lazy(() => import('@client/views/Main/Contact'));
const Posts = lazy(() => import('@client/views/Main/Posts'));
const Post = lazy(() => import('@client/views/Main/Post'));
const About = lazy(() => import('@client/views/Main/About'));

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { authorsLength, handleSetAuthorsLength } = this.props;

    if (!authorsLength) {
      handleSetAuthorsLength(new Array(1).length);
    }
  }

  render() {
    return (
      <>
        <header className="mb-2">
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
    );
  }
}

MainPage.propTypes = {
  authorsLength: PropTypes.number.isRequired,
  handleSetAuthorsLength: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorsLength: state.navbar.authorsLength,
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAuthorsLength: (length) => {
    dispatch(setAuthorsLength(length));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
