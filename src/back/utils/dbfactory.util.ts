import Datastore from 'nedb';

const createAnalytics = () => {
  return new Datastore({ filename: 'DB/analytics', autoload: true });
};

const createResponse = () => {
  return new Datastore({ filename: 'DB/responsesnew', autoload: true });
};

const createContexts = () => {
  return new Datastore({ filename: 'DB/contexts', autoload: true });
};

export default {
  createAnalytics,
  createResponse,
  createContexts,
};
