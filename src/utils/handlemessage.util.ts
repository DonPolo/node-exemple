import watson from './services/watson.util';
import luis from './services/luis.util';
import wit from './services/wit.util';
import sap from './services/sap.util';

import fulfill from './fulfill.util';
import ContextsManager from './contextsmanager.util';
import ecl, { Concierge, Site } from '../models/ecl';
import {
  Contexts,
  Request,
  ServiceRequest,
  FulfillResult,
  FulfillRequest,
  ParsedResponse,
} from './types.util';

/**
 * Get contexts relative to the user site
 * @param to Phone number or slack id of the media where the message arrived : string
 * @param platform Platform which received the message (slack, tel) : string
 * @returns An object which contains the informations relative to the user site : SiteContexts
 */
async function getSiteContexts(
  to: string,
  platform: string,
): Promise<{ concierges: Concierge[]; site: Site | null }> {
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

/**
 * Handle a message and return a response
 * @param msg Message sent by user : string
 * @param from User mail or phone number : string
 * @param to Slack code or phone number : string
 * @param service NLP to use (sap, luis, watson, wit) : string
 * @param platform Type of the platform (slack, tel) : string
 * @param acceptedtypes Types accepted by the platform (text, button, dropdown, image, link) : string[]
 * @returns An array of objects containing the responses : any
 */
export default async function(
  request: Request,
): Promise<ParsedResponse | null> {
  if (!request.service && !request.result) return null;

  /* Get contexts */
  const contexts: Contexts = await ContextsManager.load(request.from);
  const a: {
    concierges: Concierge[];
    site: Site | null;
  } = await getSiteContexts(request.to, request.platform);
  contexts.site = a.site;
  contexts.concierges = a.concierges;

  if (request.service) {
    /* Get service (NLP) Result */
    const serviceRequest: ServiceRequest = {
      contexts,
      msg: request.msg,
    };
    switch (request.service) {
      case 'watson':
        request.result = await watson(serviceRequest);
        break;
      case 'luis':
        request.result = await luis(serviceRequest);
        break;
      case 'wit':
        request.result = await wit(serviceRequest);
        break;
      case 'sap':
        request.result = await sap(serviceRequest);
        break;
      default:
        request.result = {
          contexts,
          response: null,
          intents: [],
          entities: [],
          query: request.msg,
        };
    }
  } else if (request.result) {
    request.result.contexts = contexts;
  }

  /* Change language */
  let lang = 'fr-tu';
  if (request.to === '+33755536910') {
    lang = 'fr-vous';
  }

  /* Get fulfill Response */
  if (!request.result) return null;
  const fulfillRequest: FulfillRequest = {
    lang,
    result: request.result,
    acceptedtypes: request.acceptedtypes,
  };
  const response: FulfillResult = await fulfill(fulfillRequest);

  /* Save contexts */
  await ContextsManager.save(request.from, response.contexts);

  /* Return response text */
  return response.response;
}
