import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import File from '../pages/file.page';
import fetch from './_mocks/fetch.mock';
import { SinonStub } from 'sinon';
import { FileInfos } from '../../types/front';

describe('Test File page', () => {
  let fakeFetch: SinonStub;
  beforeAll(() => {
    fakeFetch = fetch.mock();
  });
  test('Render the page correctly', async () => {
    const fileInf: FileInfos = {
      intent: 'toto',
      cat: 'response',
    };
    const page = mount(
      <BrowserRouter>
        <File file={fileInf} />
      </BrowserRouter>,
      { attachTo: document.body },
    );
    expect(page).toMatchSnapshot();
  });
  afterAll(() => {
    fetch.unmock(fakeFetch);
  });
});
