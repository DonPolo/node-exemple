import helper from './helper';
import fc from 'fast-check';
import { expect as exp } from 'chai';
import dbMock from './_mocks/db.mock';
import analyticsUtil from '../utils/analytics.util';
import { getEmptyAnalyticsData } from '../../types/types.util';

// tslint:disable: no-unused-expression

describe('Webapp', () => {
  beforeEach(async () => {
    await helper.logout();
  });

  // Contact webapp API
  describe('API', () => {
    describe('Login', () => {
      test('When log with invalid credentials, it should return an error #sanity', async () => {
        const response = await helper
          .postForm('/webapp/api?query=login', {
            pseudo: fc.string(),
            pwd: fc.string(),
          })
          .expect(200);
        expect(response.text).toBe(
          JSON.stringify({
            error: true,
            msg: 'Invalid pseudo or password',
          }),
        );
      });

      test('When log with valid credentials, it should return the user #cold-test #sanity', async () => {
        const response = await helper
          .postForm('/webapp/api?query=login', { pseudo: 'admin', pwd: 'pass' })
          .expect(200);
        expect(response.text).toBe(
          JSON.stringify({ pseudo: 'admin', pwd: 'pass' }),
        );
      });

      test('When already logged should return the user', async () => {
        await helper.login();
        const response = await helper
          .postForm('/webapp/api?query=login', { pseudo: 'admin', pwd: 'pass' })
          .expect(200);
        expect(response.text).toBe(
          JSON.stringify({ pseudo: 'admin', pwd: 'pass' }),
        );
      });

      test('When invalid parameters should return null', async () => {
        const response = await helper
          .postForm('/webapp/api?query=login', { pseudo: 'admin' })
          .expect(200);
        exp(JSON.parse(response.text).error).to.be.true;
      });
    });

    describe('Home', () => {
      test('When logged it should be good', async () => {
        await helper.login();
        const response = await helper
          .postForm('/webapp/api?query=home')
          .expect(200);
        expect(JSON.parse(response.text).response).toBeInstanceOf(Array);
        expect(JSON.parse(response.text).training).toBeInstanceOf(Array);
      });
    });

    describe('Analytics', () => {
      test('When calling analytics it should return an array of analytics data', async () => {
        await helper.login();
        const response = await helper
          .postForm('/webapp/api?query=analytics')
          .expect(200);
        exp(JSON.parse(response.text).datas).to.be.an('array');
      });
    });

    describe('Params', () => {
      test('When calling params it should return an array of string', async () => {
        await helper.login();
        const response = await helper
          .postForm('/webapp/api?query=params')
          .expect(200);
        exp(JSON.parse(response.text)).to.be.an('array');
      });
    });

    describe('Entities', () => {
      test('When calling entities it should return an array of string', async () => {
        await helper.login();
        const response = await helper
          .postForm('/webapp/api?query=entities')
          .expect(200);
        exp(JSON.parse(response.text)).to.be.an('array');
      });
    });

    describe('User', () => {
      test('When not logged should return null', async () => {
        const result = await helper
          .postForm('/webapp/api?query=user')
          .expect(200);
        exp(JSON.parse(result.text)).to.be.null;
      });
    });

    describe('Add response', () => {
      test('When all good return 200', async () => {
        await helper.login();
        dbMock.emptyResponseDb();
        const response = await helper
          .postForm('/webapp/api?query=addresponse', {
            name: 'test',
            type: 'test',
            beautyname: 'test',
            big_intent: 'test',
          })
          .expect(200);
        // We could test if it has inserted the document in the DB
      });
    });

    describe('Get a file', () => {
      test('When all good should return 200', async () => {
        await helper.login();
        await helper.postForm('/webapp/api?query=file');
      });
    });

    describe('Failed', () => {
      test('When no query should return 404', async () => {
        await helper.postForm('/webapp/api').expect(404);
      });
      test('When bad query should return 404', async () => {
        await helper.login();
        await helper.postForm('/webapp/api?query=toto').expect(404);
      });
      test('When not logged cannot access home, addresponse, analytics, entities and params (returns 401)', async () => {
        await helper.postForm('/webapp/api?query=home').expect(401);
        await helper.postForm('/webapp/api?query=addresponse').expect(401);
        await helper.postForm('/webapp/api?query=analytics').expect(401);
        await helper.postForm('/webapp/api?query=entities').expect(401);
        await helper.postForm('/webapp/api?query=params').expect(401);
      });
    });
  });

  describe('Old API', () => {
    describe('Archived', () => {
      test('When missing id should respond 404', async () => {
        await helper.login();
        await helper.postForm('/webapp/archived').expect(404);
      });
      test('When all good should respond 200', async () => {
        await helper.login();
        await analyticsUtil.addEntry(getEmptyAnalyticsData());
        const datas = await analyticsUtil.getAll();
        const id = datas.filter(d => !d.archived)[0]._id;
        await helper.postForm('/webapp/archived', { id }).expect(200);
        const newdatas = await analyticsUtil.getAll();
        const data = newdatas.filter(d => d._id === id)[0];
        exp(data.archived).to.be.true;
      });
    });
    describe('Recover', () => {
      test('When missing id should respond 404', async () => {
        await helper.login();
        await helper.postForm('/webapp/recover').expect(404);
      });
      test('When all good should respond 200', async () => {
        await helper.login();
        const a = getEmptyAnalyticsData();
        a.archived = true;
        await analyticsUtil.addEntry(a);
        const datas = await analyticsUtil.getAll();
        const id = datas.filter(d => d.archived)[0]._id;
        await helper.postForm('/webapp/recover', { id }).expect(200);
        const newdatas = await analyticsUtil.getAll();
        const data = newdatas.filter(d => d._id === id)[0];
        exp(data.archived).to.be.false;
      });
    });
    describe('Modif response', () => {
      test('When all good should respond 200', async () => {
        await helper.login();
        await helper
          .postJson('/webapp/modif', {
            cat: 'response',
            type: 'test',
            name: 'test',
            newtype: 'newtest',
            newname: 'newtest',
          })
          .expect(200);
        // We should test if the document has been inserted on db
      });
    });
    describe('Delete response', () => {
      test('When all good should respond 200', async () => {
        await helper.login();
        await helper
          .postJson('/webapp/delete', {
            cat: 'response',
            type: 'newtest',
            name: 'newtest',
          })
          .expect(200);
        // We should test if the document has been deleted on db
      });
    });
    describe('Save response', () => {
      test('When all good should respond 200', async () => {
        await helper.login();
        await helper
          .postJson('/webapp/save', { code: 'toto: tata', cat: 'response' })
          .expect(200);
      });
      test('Wrong yaml should return an error', async () => {
        await helper.login();
        const res = await helper
          .postJson('/webapp/save', {
            code: 'toto: \n\ttata:\n\t- toto',
            cat: 'response',
          })
          .expect(200);
        exp(JSON.parse(res.text).error).to.not.be.null;
      });
    });
    describe('Save training', () => {
      test('When all good should respond 200', async () => {
        await helper.login();
        await helper
          .postJson('/webapp/save', {
            oldcode: '- toto\n- titi\n- {{ john@doe.fr | email }}',
            code: '- titi\n- tata',
            cat: 'training',
            file: 'test.jest',
          })
          .expect(200);
      });
    });
  });

  // Logout from the webapp
  describe('Logout', () => {
    test('When calling disconnect it should redirect', async () => {
      await helper.login();
      await helper.get('/webapp/disconnect').expect(302);
    });

    test('When calling disconnect and not logged, it should redirect', async () => {
      await helper.get('/webapp/disconnect').expect(302);
    });
  });

  // Get the webapp
  test('All', async () => {
    const response = await helper.get('/webapp').expect(200);
    // Do more tests
  });

  // Send a message to lifee via the chat
  describe('Chat', () => {
    beforeAll(() => {
      dbMock.fullResponseDb();
    });
    test('When send a message without params it should return 404', async () => {
      await helper.login();
      await helper.postJson('/webapp/sendmessage').expect(404);
    });
    test('Send a message', async () => {
      await helper.login();
      const response = await helper
        .postJson('/webapp/sendmessage', {
          msg: 'Je voudrais les horaires de la conciergerie',
          from: 'toto',
          types: ['text'],
        })
        .expect(200);
      exp(JSON.parse(response.text).intent).to.be.equal('infos.schedule');
    });
    test('When send an event without params it should return 404', async () => {
      await helper.login();
      await helper.postJson('/webapp/sendevent').expect(404);
    });
    test('Send a wrong event', async () => {
      await helper.login();
      await helper
        .postJson('/webapp/sendevent', {
          event: [{ action: 'toto|tata' }],
          from: 'toto',
          types: ['text'],
        })
        .expect(200);
    });
    afterAll(() => {
      dbMock.emptyResponseDb();
    });
  });
});
