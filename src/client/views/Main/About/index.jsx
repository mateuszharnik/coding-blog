import React, { Component } from 'react';

class About extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Coding Blog | O mnie';
  }

  render() {
    return (
      <div>About is ready!</div>
    );
  }
}

export default About;
