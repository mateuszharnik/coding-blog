import React, { Component } from 'react';

class Contact extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Coding Blog | Kontakt';
  }

  render() {
    return (
      <div>Contact is ready!</div>
    );
  }
}

export default Contact;
