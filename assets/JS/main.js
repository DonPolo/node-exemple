/* ################# */
/* #### Imports #### */
/* ################# */

import './utils/style.util';

import ReactDOM from 'react-dom';
import React from 'react';

import App from './utils/app.util';

import datamanager from './utils/datamanager.util';
datamanager.user = datas.user;

window.addEventListener('load', () => {
  const element = <App datas={datas}/>
  ReactDOM.render(
    element,
    document.getElementById('app')
  );
});
