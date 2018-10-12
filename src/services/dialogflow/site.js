// @flow
import { WebhookClient } from 'dialogflow-fulfillment';

import Ecl from '../../models/ecl';
import { getContext } from '.';

const intentContact = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent);
  res.push(
    req.t('intent.contact', {
      count: ctx.concierges.length,
      conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges),
      siteEmail: ctx.site.email,
      siteTelephone: ctx.site.telephone,
      siteSchedules: ctx.site.horaires
    })
  );
};

const intentSchedule = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent);
  res.push(
    req.t('intent.schedule', {
      count: ctx.concierges.length,
      conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges),
      siteSchedules: ctx.site.horaires
    })
  );
};

const intentRelaisColis = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent);
  if (ctx.site)
    res.push(
      req.t('intent.relaisColis', {
        count: ctx.concierges.length,
        conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges),
        siteRelaisColis: ctx.site.relaisColis
      })
    );
};

const intentServices = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent);
  if (ctx.site)
    res.push(
      req.t('intent.services', {
        siteServices: ctx.site.guideServices
      })
    );
};

const intentInfos = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent);
  if (ctx.site)
    res.push(
      req.t('intent.infos', {
        count: ctx.concierges.length,
        conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges),
        siteEmail: ctx.site.email,
        siteTelephone: ctx.site.telephone,
        siteSchedules: ctx.site.horaires,
        siteServices: ctx.site.guideServices,
        siteRelaisColis: ctx.site.relaisColis
      })
    );
};

export default {
  contact: intentContact,
  schedule: intentSchedule,
  relaisColis: intentRelaisColis,
  services: intentServices,
  infos: intentInfos
};
