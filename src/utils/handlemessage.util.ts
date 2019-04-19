import watson from './services/watson.util';
import luis from './services/luis.util';
import wit from './services/wit.util';
import sap from './services/sap.util';

import fulfill from './fulfill.util';
import ContextsManager from './contextsmanager.util';
import ecl from '../models/ecl';
import { SiteContexts, Contexts, FulfillResponse, Result } from './types.util';
import i18n from 'i18next';

async function getSiteContexts(
  to: string,
  platform: string,
): Promise<SiteContexts> {
  let service = 'twilio';
  if (platform === 'slack') {
    service = 'slack';
  }
  if (!to) throw Error(`Unknown to for service ${service}`);
  const Ecl = new ecl();
  const site = await Ecl.getSiteInfos(service, to);
  if (!site) throw Error(`Unknown Site for service ${service} with id ${to}`);

  const concierges = await Ecl.getConciergeList(site.code);
  return {
    concierges,
    site,
  };
}

export default async function(
  msg: string,
  from: string,
  to: string,
  service: string,
  platform: string,
) {
  /* Get contexts */
  let contexts: Contexts = await ContextsManager.load(from);
  const a: SiteContexts = await getSiteContexts(to, platform);
  contexts.site = a;

  /* Get service Result */
  let result;
  switch (service) {
    case 'watson':
      result = await watson(msg, contexts);
      break;
    case 'luis':
      result = await luis(msg, contexts);
      break;
    case 'wit':
      result = await wit(msg, contexts);
      break;
    case 'sap':
      result = await sap(msg, contexts);
      break;
    default:
      result = {
        contexts,
        result: {
          response: null,
          intents: [],
          entities: [],
          query: msg,
        },
      };
  }
  contexts = result.contexts;
  /* Change language */
  if (to === '+33755536910') {
    await i18n.changeLanguage('fr-vs');
  } else {
    await i18n.changeLanguage('fr-tu');
  }
  /* Defines accepted type for the platform */
  let types = [];
  switch (platform) {
    case 'slack':
      types = ['buttons', 'dropdown', 'text'];
      break;
    case 'tel':
      types = ['text'];
      break;
    default:
      types = ['text'];
  }
  /* Get fulfill Response */
  const response: FulfillResponse = await fulfill(
    result.result,
    contexts,
    types,
  );
  console.log(response);
  /* Save contexts */
  await ContextsManager.save(from, response.contexts);
  /* Return response text */
  return response.response;
}

export async function handleMsgWithoutService(
  msg: string,
  from: string,
  to: string,
  platform: string,
  result: Result,
) {
  /* Get contexts */
  const contexts: Contexts = await ContextsManager.load(from);
  const a: SiteContexts = await getSiteContexts(to, platform);
  contexts.site = a;
  /* Change language */
  if (to === '+33755536910') {
    await i18n.changeLanguage('fr-vs');
  } else {
    await i18n.changeLanguage('fr-tu');
  }
  /* Defines accepted type for the platform */
  let types = [];
  switch (platform) {
    case 'slack':
      types = ['buttons', 'dropdown', 'text'];
      break;
    case 'tel':
      types = ['text'];
      break;
    default:
      types = ['text'];
  }
  /* Get fulfill Response */
  const response: FulfillResponse = await fulfill(result, contexts, types);
  /* Save contexts */
  await ContextsManager.save(from, response.contexts);
  /* Return response text */
  return response.response;
}
