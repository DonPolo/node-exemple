import React from 'react';
import { mount } from 'enzyme';
import { expect as exp } from 'chai';
import { BrowserRouter } from 'react-router-dom';
import AddResponse from '../pages/addresponse.page';
import fetch from './_mocks/fetch.mock';
import { SinonStub } from 'sinon';

describe('Test Addresponse page', () => {
  let fakeFetch: SinonStub;
  beforeAll(() => {
    fakeFetch = fetch.mock();
  });
  test('Render the page correctly', async () => {
    const page = mount(
      <BrowserRouter>
        <AddResponse />
      </BrowserRouter>,
    );
    await page.find('[test="addresp_save"]').simulate('submit');
    exp(fakeFetch.calledWith('/webapp/api?query=addresponse'));
  });
  afterAll(() => {
    fetch.unmock(fakeFetch);
  });
});
