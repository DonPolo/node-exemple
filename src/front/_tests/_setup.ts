import chai from 'chai';
import dirtyChai from 'dirty-chai';
import createChaiJestDiff from 'chai-jest-diff';
import Adapter from 'enzyme-adapter-react-16';
import createChaiEnzyme from 'chai-enzyme';
import { configure as configureEnzyme } from 'enzyme';
import sinonChai from 'sinon-chai';

chai
  .use(dirtyChai)
  .use(createChaiJestDiff())
  .use(createChaiEnzyme())
  .use(sinonChai);

configureEnzyme({ adapter: new Adapter() });
