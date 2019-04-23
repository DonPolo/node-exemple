import { ResultEntity, Contexts, FulfillResponse } from '../types.util';
import responsemanager from '../responsemanager.util';

async function fallback(
  entities: ResultEntity[] | null,
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  const res: FulfillResponse = {
    confidence,
    contexts: c,
    response: await responsemanager.load('fallback'),
  };
  return res;
}

export default {
  fallback,
};
