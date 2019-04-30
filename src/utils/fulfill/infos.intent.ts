import responsemanager from '../responsemanager.util';
import { IntentRequest, IntentResult } from '../types.util';

async function opentime(request: IntentRequest) {
  let txt = await responsemanager.load('infos.schedulenotfound');
  if (request.contexts.site) {
    txt = await responsemanager.load('infos.schedule');
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function contact(request: IntentRequest) {
  let txt = await responsemanager.load('infos.contactnotfound');
  if (request.contexts.site) {
    txt = await responsemanager.load('infos.contact');
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function services(request: IntentRequest) {
  let txt = await responsemanager.load('infos.servicesnotfound');
  if (request.contexts.site) {
    txt = await responsemanager.load('infos.services');
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function relaiscolis(request: IntentRequest) {
  let txt = await responsemanager.load('infos.relaiscolisnotfound');
  if (request.contexts.site) {
    txt = await responsemanager.load('infos.relaiscolis');
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
