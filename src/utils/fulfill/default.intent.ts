import { IntentResult, IntentRequest } from '../types.util';
import responsemanager from '../responsemanager.util';

async function fallback(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: await responsemanager.load('default.fallback'),
  };
  return res;
}

export default {
  fallback,
};
