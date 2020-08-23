import '@client/helpers/devtools';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@client/app';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
