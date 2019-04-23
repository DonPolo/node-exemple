import responsemanager from '../responsemanager.util';
import { ResultEntity, Contexts, FulfillResponse } from '../types.util';
import Ecl from '../../models/ecl';

async function opentime(
  entities: ResultEntity[],
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  let txt = responsemanager.load('intent.infos.schedulenotfound');
  let params = null;
  if (c.site) {
    txt = responsemanager.load('intent.infos.schedule');
    params = {
      count: c.site.concierges.length,
      conciergeGivenName: Ecl.getPrenomConcierge(c.site.concierges),
      sitesSchedules: c.site.site.horaires,
    };
  }
  const res: FulfillResponse = {
    confidence,
    contexts: c,
    response: [
      {
        params,
        text: txt,
        type: 'text',
      },
    ],
  };
  return res;
}

async function contact(
  entities: ResultEntity[],
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  let txt = await responsemanager.load('intent.infos.contactnotfound');
  let params = null;
  if (c.site) {
    txt = await responsemanager.load('intent.infos.contact');
    params = {
      count: c.site.concierges.length,
      conciergeGivenName: Ecl.getPrenomConcierge(c.site.concierges),
      siteEmail: c.site.site.email,
      siteTelephone: c.site.site.telephone,
      siteSchedules: c.site.site.horaires,
    };
  }
  const res: FulfillResponse = {
    confidence,
    contexts: c,
    response: txt,
  };
  return res;
}

async function services(
  entities: ResultEntity[],
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  let txt = await responsemanager.load('intent.infos.servicesnotfound');
  let params = null;
  if (c.site) {
    txt = await responsemanager.load('intent.infos.services');
    params = {
      siteServices: c.site.site.guideServices,
    };
  }
  const res: FulfillResponse = {
    confidence,
    params,
    contexts: c,
    response: txt,
  };
  return res;
}

async function relaiscolis(
  entities: ResultEntity[],
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  let txt = await responsemanager.load('intent.infos.relaiscolisnotfound');
  let params = null;
  if (c.site) {
    txt = await responsemanager.load('intent.infos.relaiscolis');
    params = {
      count: c.site.concierges.length,
      conciergeGivenName: Ecl.getPrenomConcierge(c.site.concierges),
      siteRelaisColis: c.site.site.relaisColis,
    };
  }
  const res: FulfillResponse = {
    confidence,
    params,
    contexts: c,
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
