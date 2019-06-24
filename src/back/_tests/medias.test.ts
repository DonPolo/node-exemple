import nexmo from './_mocks/nexmo.mock';
import helper from './helper';
import { SinonStub } from 'sinon';
import { expect as exp } from 'chai';
import dbMock from './_mocks/db.mock';

beforeAll(() => {
  console.log('Full the db');
  dbMock.fullResponseDb();
});
describe('Medias API testing', () => {
  // Twilio tests
  describe('Twilio', () => {
    // Success
    test('When sending "Bonjour", it should respond with default.welcome response', async () => {
      const result = await helper
        .postForm(
          '/media/twilio',
          { From: '+33075097531', Body: 'Bonjour', To: '+33757916905' },
          { Authorization: 'Basic dG90bzp0aXRp' },
        )
        .expect(200);
      expect(result.headers['content-type']).toBe('text/xml');
    });
    // Failed
    test('When missing parameters should respond 400', async () => {
      await helper
        .postForm('/media/twilio', {}, { Authorization: 'Basic dG90bzp0aXRp' })
        .expect(400);
    });
    test('When missing authorization should return 401', async () => {
      await helper.postForm('/media/twilio').expect(401);
    });
  });
  // Nexmo tests
  describe('Nexmo', () => {
    let fakeNexmo: SinonStub;
    beforeAll(() => {
      fakeNexmo = nexmo.mock();
    });
    // Success
    test('Send a response', async () => {
      await helper
        .postForm(
          '/media/nexmo',
          {
            msisdn: '33075097531',
            text: 'Bonjour',
            to: '33757916905',
          },
          { Authorization: 'Basic dG90bzp0aXRp' },
        )
        .expect(200);
      exp(fakeNexmo.callCount).to.equal(1);
    });
    // Error
    test('When missing parameters should respond 400', async () => {
      await helper
        .postForm('/media/nexmo', {}, { Authorization: 'Basic dG90bzp0aXRp' })
        .expect(400);
    });
    test('When missing authorization should respond 401', async () => {
      await helper.postForm('/media/nexmo').expect(401);
    });
    afterAll(() => {
      nexmo.unmock(fakeNexmo);
    });
  });
});

afterAll(() => {
  dbMock.emptyResponseDb();
});
