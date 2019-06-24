import Datastore from 'nedb';
import dbfactory from './dbfactory.util';

let contextDb: Datastore | null = null;
let analyticsDb: Datastore | null = null;
let responseDb: Datastore | null = null;

const getContext = () => {
  if (contextDb) {
    return contextDb;
  }
  contextDb = dbfactory.createContexts();
  return contextDb;
};

const getAnalytics = () => {
  if (analyticsDb) {
    return analyticsDb;
  }
  analyticsDb = dbfactory.createAnalytics();
  return analyticsDb;
};

const getResponse = () => {
  if (responseDb) {
    return responseDb;
  }
  responseDb = dbfactory.createResponse();
  return responseDb;
};

export default {
  getContext,
  getAnalytics,
  getResponse,
};
