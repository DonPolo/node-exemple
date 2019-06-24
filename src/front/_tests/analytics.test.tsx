import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Analytics from '../pages/analytics.page';
import fetch from './_mocks/fetch.mock';
import { SinonStub } from 'sinon';

describe('Test Analytics page', () => {
  let fakeFetch: SinonStub;
  beforeAll(() => {
    fakeFetch = fetch.mock();
  });
  test('Render the page correctly', async () => {
    const page = mount(
      <BrowserRouter>
        <Analytics />
      </BrowserRouter>,
    );
    expect(page).toMatchSnapshot();
  });
  afterAll(() => {
    fetch.unmock(fakeFetch);
  });
});
