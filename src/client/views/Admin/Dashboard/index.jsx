import React, { Component } from 'react';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount = () => {
    document.title = 'Coding Blog | Panel administratora';
  }

  render = () => (
    <div>Dashboard is ready!</div>
  )
}

export default Dashboard;
