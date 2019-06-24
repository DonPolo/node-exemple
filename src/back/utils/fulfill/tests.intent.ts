import { IntentRequest, IntentResult } from '../../../types/types.util';

async function buttons(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'test.buttons',
  };
  return res;
}

async function dropdown(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'test.dropdown',
  };
  return res;
}

async function link(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'test.link',
  };
  return res;
}

async function text(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'test.text',
  };
  return res;
}

async function media(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'test.media',
  };
  return res;
}

async function mix(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'test.mix',
  };
  return res;
}

async function clone(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'test.clone',
  };
  return res;
}

async function listgroup(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: 'test.list',
  };
  return res;
}

export default {
  buttons,
  dropdown,
  link,
  text,
  media,
  mix,
  clone,
  listgroup,
};
