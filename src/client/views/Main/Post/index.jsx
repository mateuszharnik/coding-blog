import React, { Component } from 'react';

class Post extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Coding Blog | Post';
  }

  render() {
    return (
      <div>Post is ready!</div>
    );
  }
}

export default Post;
