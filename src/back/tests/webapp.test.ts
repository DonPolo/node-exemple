import helper from './helper';
import fc from 'fast-check';

beforeEach(async () => {
  await helper.logout();
});

describe('Webapp', () => {
  describe('API', () => {
    describe('Login', () => {
      test('When log with invalid credentials, it should return an error #sanity', async () => {
        const response = await helper
          .post('/webapp/api?query=login', {
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
          .post('/webapp/api?query=login', { pseudo: 'admin', pwd: 'pass' })
          .expect(200);
        expect(response.text).toBe(
          JSON.stringify({ pseudo: 'admin', pwd: 'pass' }),
        );
      });
    });

    describe('Home', () => {
      test('When logged it should be good', async () => {
        await helper.login();
        const response = await helper
          .post('/webapp/api?query=home')
          .expect(200);
        expect(JSON.parse(response.text).response).toBeInstanceOf(Array);
        expect(JSON.parse(response.text).training).toBeInstanceOf(Array);
      });
    });
  });

  describe('Logout', () => {
    test('When calling disconnect it should redirect', async () => {
      await helper.get('/webapp/disconnect').expect(302);
    });
  });
});
