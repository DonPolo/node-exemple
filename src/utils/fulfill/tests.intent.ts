import { IntentRequest, IntentResult } from '../types.util';
import responsemanager from '../responsemanager.util';

async function buttons(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: await responsemanager.load('test.buttons'),
  };
  return res;
}

async function dropdown(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: await responsemanager.load('test.dropdown'),
  };
  return res;
}

async function link(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: await responsemanager.load('test.link'),
  };
  return res;
}

async function text(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: await responsemanager.load('test.text'),
  };
  return res;
}

async function media(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: await responsemanager.load('test.media'),
  };
  return res;
}

async function mix(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: await responsemanager.load('test.mix'),
  };
  return res;
}

async function clone(request: IntentRequest): Promise<IntentResult> {
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: await responsemanager.load('test.clone'),
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
};
