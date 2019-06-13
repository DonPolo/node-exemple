import session from 'supertest-session';
import app from '../app';

const request = session(app);

const login = () => {
  return post('/webapp/api?query=login', {
    pseudo: 'admin',
    pwd: 'pass',
  });
};

const logout = () => {
  return get('/webapp/disconnect');
};

const post = (url: string, body: any = {}) => {
  const httpRequest = request.post(url);
  httpRequest.send(body);
  return httpRequest;
};

const get = (url: string) => {
  return request.get(url);
};

export default {
  post,
  login,
  logout,
  get,
};
