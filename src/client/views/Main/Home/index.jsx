import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount = () => {
    document.title = 'Coding Blog';
  }

  render = () => (
    <div>Home is ready!</div>
  )
}

export default Home;
