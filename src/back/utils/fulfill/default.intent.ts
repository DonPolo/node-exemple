import { IntentResult, IntentRequest } from '../../../types/types.util';

async function fallback(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'default.fallback',
  };
  return res;
}

async function welcome(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'default.welcome',
  };
  return res;
}

export default {
  fallback,
  welcome,
};
