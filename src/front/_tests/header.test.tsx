import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/header.component';
import { User } from '../../types/front';
import { BrowserRouter } from 'react-router-dom';

const user: User = {
  pseudo: 'Admin',
  pass: '',
};

// Unusefull
describe('Header style testing', () => {
  test('No regression', () => {
    const header = renderer.create(
      <BrowserRouter>
        <Header user={user} nav={2} />
      </BrowserRouter>,
    );

    const tree = header.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
