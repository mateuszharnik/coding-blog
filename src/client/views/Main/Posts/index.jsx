import React, { Component } from 'react';

class Posts extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Coding Blog | Posty';
  }

  render() {
    return (
      <div>Posts is ready!</div>
    );
  }
}

export default Posts;
