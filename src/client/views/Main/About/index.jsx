import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { aboutLinkNames } from '@client/helpers/constants';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { authorsLength } = this.props;

    const title = authorsLength > 1 ? aboutLinkNames.ABOUT_US : aboutLinkNames.ABOUT_ME;
    document.title = `Coding Blog | ${title}`;
  }

  render() {
    return (
      <div>About is ready!</div>
    );
  }
}

About.propTypes = {
  authorsLength: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  authorsLength: state.navbar.authorsLength,
});

export default connect(mapStateToProps)(About);
