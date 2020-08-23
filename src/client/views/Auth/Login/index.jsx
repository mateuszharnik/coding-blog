import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Coding Blog | Zaloguj';
  }

  render() {
    return (
      <div>Login is ready!</div>
    );
  }
}

export default Login;
