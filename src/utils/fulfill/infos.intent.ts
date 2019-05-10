import responsemanager from '../responsemanager.util';
import { IntentRequest, IntentResult } from '../types.util';
import format from '../format.util';
import { isEmpty } from '../func.util';
import EasyWhere from '../../models/easywhere';
import striptags from 'striptags';

const easywhere = new EasyWhere();

async function opentime(request: IntentRequest): Promise<IntentResult> {
  let txt = await responsemanager.load('infos.schedule');
  if (request.contexts.site) {
    const precision = request.entities.filter(ex => ex.name === 'datetime');
    if (precision.length > 0) {
      const close =
        request.entities.filter(en => en.name === 'close').length > 0;
      const e = precision[0];
      const possibilities = e.value.split(' ');
      await possibilities.reduce(async (previous: any, p: string) => {
        await previous;
        const po = p.trim().toLowerCase();
        let day = null;
        if (format.horaires.days.includes(po)) {
          // It's a day
          day = po;
        } else if (po === 'demain' || po === 'hier') {
          // We have to find the day
          if (po === 'demain') {
            day = format.horaires.getDayFromNow(1);
          } else {
            day = format.horaires.getDayFromNow(-1);
          }
        }
        if (day && request.contexts.site) {
          const daysinfos = format.horaires.groupByDay(
            request.contexts.site.horairesplus,
            day,
          );
          if (daysinfos && !isEmpty(daysinfos)) {
            // It's open
            if (close) {
              txt = await responsemanager.load('infos.schedule_no_open');
              request.contexts.site.horaires = `le ${format.horaires.writeHoraires(
                format.horaires.groupByHoraires(daysinfos)[0],
              )}`;
            } else {
              txt = await responsemanager.load('infos.schedule_yes_open');
              request.contexts.site.horaires = `le ${format.horaires.writeHoraires(
                format.horaires.groupByHoraires(daysinfos)[0],
              )}`;
            }
          } else {
            // It's close
            if (close) {
              txt = await responsemanager.load('infos.schedule_yes_close');
            } else {
              txt = await responsemanager.load('infos.schedule_no_close');
            }
          }
        }
      }, Promise.resolve());
    } else {
      txt = await responsemanager.load('infos.schedule');
    }
  } else {
    txt = await responsemanager.load('infos.schedulenotfound');
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function contact(request: IntentRequest): Promise<IntentResult> {
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

async function services(request: IntentRequest): Promise<IntentResult> {
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

async function relaiscolis(request: IntentRequest): Promise<IntentResult> {
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

async function compopanier(request: IntentRequest): Promise<IntentResult> {
  let confidence = request.confidence;
  let txt;
  const paniers = request.entities.filter(e => e.name === 'service-panier');
  if (paniers.length > 0) {
    const panier = paniers[0].value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const resu = await easywhere.getInfosPanier(
      panier,
      request.contexts.site.id,
    );
    if (resu) {
      const paniertxt = striptags(resu.desc);
      if (!request.contexts.other) request.contexts.other = {};
      request.contexts.other.compopanier = paniertxt;
      txt = await responsemanager.load('infos.compopanier');
    } else {
      txt = await responsemanager.load('infos.paniernotexist');
    }
  } else {
    confidence = 0;
    txt = await responsemanager.load('default.fallback');
  }

  const res: IntentResult = {
    confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function infos(request: IntentRequest): Promise<IntentResult> {
  let txt = await responsemanager.load('infos.infosnotfound');
  if (request.contexts.site) {
    txt = await responsemanager.load('infos.infos');
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
  compopanier,
  infos,
};
