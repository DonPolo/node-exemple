import sinon from 'sinon';
import Datastore from 'nedb';
import dbfactory from '../../utils/dbfactory.util';
import dbmanager from '../../utils/dbmanager.util';

const realresponse = new Datastore({
  filename: 'DB/responsesnew',
  autoload: true,
});

const mockAnalyticsDb = () => {
  const fakeAnalytics = sinon.stub(dbfactory, 'createAnalytics');
  fakeAnalytics.returns(
    new Datastore({ filename: 'DB/analytics_test', autoload: true }),
  );
  return fakeAnalytics;
};

const mockResponseDb = () => {
  const fakeResponse = sinon.stub(dbfactory, 'createResponse');
  fakeResponse.returns(
    new Datastore({ filename: 'DB/response_test', autoload: true }),
  );
  return fakeResponse;
};

const mockContextDb = () => {
  const fakeContext = sinon.stub(dbfactory, 'createContexts');
  fakeContext.returns(
    new Datastore({ filename: 'DB/contexts_test', autoload: true }),
  );
  return fakeContext;
};

const fullResponseDb = () => {
  const test = dbmanager.getResponse();
  realresponse.find({}).exec((err: any, documents: any) => {
    if (err) throw err;
    documents.forEach((doc: any) => {
      test.insert(doc);
    });
  });
};

const emptyResponseDb = () => {
  const test = dbmanager.getResponse();
  test.remove({}, { multi: true });
};

export default {
  mockAnalyticsDb,
  mockResponseDb,
  mockContextDb,
  fullResponseDb,
  emptyResponseDb,
};
