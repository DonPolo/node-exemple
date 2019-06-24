import sinon from 'sinon';
import fetch from '../../utils/fetchit';

const mock = (returnValue: any = {}) => {
  const fakeFetch = sinon.stub(fetch, 'fetchIt');
  const res: any = Promise.resolve({
    json: () => {
      return returnValue;
    },
  });
  fakeFetch.returns(res);
  return fakeFetch;
};

const unmock = (stub: sinon.SinonStub) => {
  stub.restore();
};

export default {
  mock,
  unmock,
};
