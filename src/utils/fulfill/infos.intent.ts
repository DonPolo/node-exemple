import responsemanager from '../responsemanager.util';
import { IntentRequest, IntentResult } from '../types.util';

async function opentime(request: IntentRequest) {
  let txt = await responsemanager.load('intent.infos.schedulenotfound');
  if (request.contexts.site) {
    txt = await responsemanager.load('intent.infos.schedule');
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function contact(request: IntentRequest) {
  let txt = await responsemanager.load('intent.infos.contactnotfound');
  if (request.contexts.site) {
    txt = await responsemanager.load('intent.infos.contact');
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function services(request: IntentRequest) {
  let txt = await responsemanager.load('intent.infos.servicesnotfound');
  if (request.contexts.site) {
    txt = await responsemanager.load('intent.infos.services');
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function relaiscolis(request: IntentRequest) {
  let txt = await responsemanager.load('intent.infos.relaiscolisnotfound');
  if (request.contexts.site) {
    txt = await responsemanager.load('intent.infos.relaiscolis');
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

export default {
  opentime,
  contact,
  services,
  relaiscolis,
};
