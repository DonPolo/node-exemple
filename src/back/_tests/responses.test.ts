import { expect as exp } from 'chai';
import helper from './helper';
import dbMock from './_mocks/db.mock';

describe('Test lifee responses', () => {
  beforeAll(() => {
    dbMock.fullResponseDb();
  });
  describe('Tests', () => {
    test('Dropdown list', async () => {
      await helper.login();
      await helper
        .postJson('/webapp/sendmessage', {
          msg: 'Donne moi la liste des groupes',
          from: 'toto',
          types: ['text', 'dropdown', 'media', 'link', 'btn'],
        })
        .expect(200);
    });
    test('Button list', async () => {
      await helper.login();
      await helper
        .postJson('/webapp/sendmessage', {
          msg: 'Donne moi la liste des groupes',
          from: 'toto',
          types: ['text', 'media', 'link', 'btn'],
        })
        .expect(200);
    });
    test('Text list', async () => {
      await helper.login();
      await helper
        .postJson('/webapp/sendmessage', {
          msg: 'Donne moi la liste des groupes',
          from: 'toto',
          types: ['text'],
        })
        .expect(200);
    });
    test('Cond', async () => {
      await helper.login();
      await helper
        .postJson('/webapp/sendmessage', {
          msg: 'J ai déposé des affaires pour le pressing',
          from: 'toto',
          types: ['text'],
        })
        .expect(200);
    });
    test('Mix', async () => {
      await helper.login();
      await helper
        .postJson('/webapp/sendmessage', {
          msg: 'mix',
          from: 'toto',
          types: ['text', 'dropdown', 'media', 'link', 'btn'],
        })
        .expect(200);
    });
  });

  describe('Infos', () => {
    test('Horaires', async () => {
      await helper.login();
      await helper
        .postForm('/webapp/sendmessage', {
          msg: 'Quels sont les horaires',
          from: 'toto',
          types: ['text', 'dropdown', 'media', 'link', 'btn'],
        })
        .expect(200);
    });
  });
  afterAll(() => {
    dbMock.emptyResponseDb();
  });
});
