import t from '../translate.util';
import { ResultEntity, Contexts, FulfillResponse } from '../types.util';

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
    response: [
      {
        text: t('intent.default.notunderstand'),
        type: 'text',
      },
    ],
  };
  return res;
}

export default {
  fallback,
};
