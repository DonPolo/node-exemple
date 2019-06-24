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

const post = (url: string, body: any = {}, headers: any = null) => {
  const httpRequest = request.post(url);
  if (headers !== null) {
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        httpRequest.set(key, headers[key]);
      }
    }
  }
  httpRequest.send(body);
  return httpRequest;
};

const postForm = (url: string, body: any = {}, headers: any = null) => {
  return post(url, body, headers);
};

const postJson = (url: string, body: any = {}, headers: any = {}) => {
  const realHeaders = headers;
  realHeaders['Content-Type'] = 'application/json';
  return post(url, JSON.stringify(body), realHeaders);
};

const get = (url: string) => {
  return request.get(url);
};

export default {
  postForm,
  postJson,
  login,
  logout,
  get,
};
