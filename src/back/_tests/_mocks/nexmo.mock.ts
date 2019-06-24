import sinon, { SinonStub } from 'sinon';
import nexmo from '../../utils/nexmo.util';

const mock = () => {
  const fakeNexmo = sinon.stub(nexmo, 'sendSms');
  return fakeNexmo;
};

const unmock = (stub: SinonStub) => {
  stub.restore();
};

export default {
  mock,
  unmock,
};
