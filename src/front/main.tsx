/* ################# */
/* #### Imports #### */
/* ################# */

import './sass/style.sass';

import ReactDOM from 'react-dom';
import React from 'react';

import App from './utils/app.util';

window.addEventListener('load', () => {
  const element = <App />;
  ReactDOM.render(element, document.getElementById('app'));
});
