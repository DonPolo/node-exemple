import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/login.page';
import fetch from './_mocks/fetch.mock';
import { SinonStub } from 'sinon';

describe('Test Login page', () => {
  let fakeFetch: SinonStub;
  beforeAll(() => {
    fakeFetch = fetch.mock();
  });
  test('Render the page correctly', async () => {
    const page = mount(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    expect(page).toMatchSnapshot();
  });
  afterAll(() => {
    fetch.unmock(fakeFetch);
  });
});
