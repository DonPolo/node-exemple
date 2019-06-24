import { IntentRequest, IntentResult } from '../../../types/types.util';
import format from '../format.util';
import { isEmpty } from '../func.util';
import EasyWhere from '../../models/easywhere';
import striptags from 'striptags';
import Entities from 'html-entities';

const easywhere = new EasyWhere();

async function opentime(request: IntentRequest): Promise<IntentResult> {
  let txt = 'infos.schedule';
  if (request.contexts.site) {
    const precision = request.entities.filter(
      ex => ex.name === 'datetime' || ex.name === '##all##',
    );
    if (precision.length > 0) {
      const close =
        request.entities.filter(
          en => en.name === 'close' || en.name === '##all##',
        ).length > 0;
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
              txt = 'infos.schedule_no_open';
              request.contexts.site.horaires = `${format.horaires.writeHoraires(
                format.horaires.groupByHoraires(daysinfos)[0],
              )}`;
            } else {
              txt = 'infos.schedule_yes_open';
              request.contexts.site.horaires = `${format.horaires.writeHoraires(
                format.horaires.groupByHoraires(daysinfos)[0],
              )}`;
            }
          } else {
            // It's close
            if (close) {
              txt = 'infos.schedule_yes_close';
            } else {
              txt = 'infos.schedule_no_close';
            }
          }
        }
      }, Promise.resolve());
    } else {
      txt = 'infos.schedule';
    }
  } else {
    txt = 'infos.schedulenotfound';
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function contact(request: IntentRequest): Promise<IntentResult> {
  let txt = 'infos.contactnotfound';
  if (request.contexts.site) {
    txt = 'infos.contact';
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function services(request: IntentRequest): Promise<IntentResult> {
  let txt = 'infos.servicesnotfound';
  if (request.contexts.site) {
    txt = 'infos.services';
  }
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function relaiscolis(request: IntentRequest): Promise<IntentResult> {
  let txt = 'infos.relaiscolisnotfound';
  if (request.contexts.site) {
    txt = 'infos.relaiscolis';
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
  const paniers = request.entities.filter(
    e => e.name === 'service-panier' || e.name === '##all##',
  );
  if (paniers.length > 0) {
    const panier = paniers[0].value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const resu = await easywhere.getInfosPanier(
      panier,
      request.contexts.site.id,
    );
    if (resu && resu.length > 0 && resu[0].desc) {
      const entities = new Entities.AllHtmlEntities();
      let tx = resu[0].desc.replace(/\n/g, '');
      tx = tx.replace(/\r/g, '');
      tx = striptags(tx, ['p', 'li']);
      if (tx.lastIndexOf('</p>') !== -1) {
        tx = `${tx.substring(0, tx.lastIndexOf('</p>'))}${tx.substring(
          tx.lastIndexOf('</p>') + 4,
        )}`;
      }
      if (tx.lastIndexOf('</li>') !== -1) {
        tx = `${tx.substring(0, tx.lastIndexOf('</li>'))}${tx.substring(
          tx.lastIndexOf('</li>') + 5,
        )}`;
      }
      tx = tx.split('</p>').join(', ');
      tx = tx.split('</li>').join(', ');
      tx = tx.replace(/&bull;/g, '');
      const paniertxt = striptags(entities.decode(tx));
      if (!request.contexts.other) request.contexts.other = {};
      request.contexts.other.compopanier = paniertxt;
      txt = 'infos.compopanier';
    } else {
      txt = 'infos.paniernotexist';
    }
  } else {
    confidence = 0;
    txt = 'default.fallback';
  }

  const res: IntentResult = {
    confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function infos(request: IntentRequest): Promise<IntentResult> {
  let txt = 'infos.infosnotfound';
  if (request.contexts.site) {
    txt = 'infos.infos';
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
