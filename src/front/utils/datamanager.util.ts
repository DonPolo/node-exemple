import { AnalyticsData } from '../../types/types.util';
import { User } from '../../types/front';
import AppController from '../controllers/app.controller';

interface Datas {
  chat: {
    oldphrases: string[];
  };
  home: {
    files: any | null;
  };
  addresponse: any;
  file: {
    parameters: string[] | null;
    entities: string[] | null;
  };
  analytics: {
    datas: AnalyticsData[] | null;
  };
  user: User | null;
  app: AppController | null;
}

const datas: Datas = {
  chat: {
    oldphrases: [],
  },
  home: {
    files: null,
  },
  addresponse: {},
  file: {
    parameters: null,
    entities: null,
  },
  analytics: {
    datas: null,
  },
  user: null,
  app: null,
};

export default datas;
