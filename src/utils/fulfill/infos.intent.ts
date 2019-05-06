import responsemanager from '../responsemanager.util';
import { IntentRequest, IntentResult, ResultEntity } from '../types.util';
import format from '../format.util';
import { isEmpty } from '../func.util';

async function opentime(request: IntentRequest) {
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
          console.log(daysinfos);
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

async function infos(request: IntentRequest) {
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
  infos,
};
