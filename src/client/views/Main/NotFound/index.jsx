import React, { Component } from 'react';

class NotFound extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Coding Blog | 404';
  }

  render() {
    return (
      <div>NotFound is ready!</div>
    );
  }
}

export default NotFound;
