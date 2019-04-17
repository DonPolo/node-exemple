import t from '../translate.util';
import { ResultEntity, Contexts, FulfillResponse } from '../types.util';
import Ecl from '../../models/ecl';

async function opentime(
  entities: ResultEntity[],
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  let txt = t('intent.infos.schedulenotfound');
  if (c.site) {
    txt = t('intent.infos.schedule', {
      count: c.site.concierges.length,
      conciergeGivenName: Ecl.getPrenomConcierge(c.site.concierges),
      sitesSchedules: c.site.site.horaires,
    });
  }
  const res: FulfillResponse = {
    confidence,
    contexts: c,
    response: {
      text: txt,
      type: 'text',
    },
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
  let txt = t('intent.infos.contactnotfound');
  if (c.site) {
    txt = t('intent.infos.contact', {
      count: c.site.concierges.length,
      conciergeGivenName: Ecl.getPrenomConcierge(c.site.concierges),
      siteEmail: c.site.site.email,
      siteTelephone: c.site.site.telephone,
      siteSchedules: c.site.site.horaires,
    });
  }
  const res: FulfillResponse = {
    confidence,
    contexts: c,
    response: {
      text: txt,
      type: 'text',
    },
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
  let txt = t('intent.infos.servicesnotfound');
  if (c.site) {
    txt = t('intent.infos.services', {
      siteServices: c.site.site.guideServices,
    });
  }
  const res: FulfillResponse = {
    confidence,
    contexts: c,
    response: {
      text: txt,
      type: 'text',
    },
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
  let txt = t('intent.infos.relaiscolisnotfound');
  if (c.site) {
    txt = t('intent.infos.relaiscolis', {
      count: c.site.concierges.length,
      conciergeGivenName: Ecl.getPrenomConcierge(c.site.concierges),
      siteRelaisColis: c.site.site.relaisColis,
    });
  }
  const res: FulfillResponse = {
    confidence,
    contexts: c,
    response: {
      text: txt,
      type: 'text',
    },
  };
  return res;
}

export default {
  opentime,
  contact,
  services,
  relaiscolis,
};
