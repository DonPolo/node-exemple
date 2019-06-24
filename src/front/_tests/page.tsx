import { mount } from 'enzyme';
import App from '../utils/app.util';
import React from 'react';
export default function renderPage(component: any) {
  const theapp = mount(<App />);
  window.location.href = '/webapp/addresponse';
  return theapp;
}
