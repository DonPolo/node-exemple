// @flow
import { WebhookClient } from 'dialogflow-fulfillment';

import { logger } from '../../config/winston';
import { getSlackEmail } from '../slack';
import config from '../../config/constants';
import Ecl from '../../models/ecl';
import { recordGlobalRequest } from './request';

import type { Site, Concierge, User } from '../../models/ecl';

const ecl = new Ecl();

export const MAX_LIFESPAN = 5;
export const hasParameters = (param: ?string | ?[]) => param && param.length;

export type EclContext = {
  service: string,
  serviceId: string,
  userId: ?string,
  site: Site,
  concierges: Concierge[],
  user: ?User,
  email: ?string
};

export const getContext = async (
  agent: WebhookClient,
  withUser: boolean = false,
  email: ?string = null
): Promise<EclContext> => {
  if (!agent.originalRequest) throw Error('Missing originalRequest');
  let service = agent.originalRequest.payload.source || 'console';
  let serviceId;
  let userIdType;
  let userId;
  let user;
  switch (service) {
    case 'twilio':
      if (agent.originalRequest.payload.data) {
        serviceId = agent.originalRequest.payload.data.To;
        userId = agent.originalRequest.payload.data.From;
        userIdType = 'mobile';
      }
      break;
    case 'slack':
      if (
        agent.originalRequest.payload.data &&
        agent.originalRequest.payload.data.event
      ) {
        serviceId = agent.originalRequest.payload.data.team_id;
        userId = await getSlackEmail(
          agent.originalRequest.payload.data.event.user
        );
        userIdType = 'email';
      }
      break;
    case 'console':
    default:
      service = config.DIALOG_FLOW.consoleService;
      serviceId = config.DIALOG_FLOW.consoleServiceId;
      userId = config.DIALOG_FLOW.consoleUserId;
      userIdType = config.DIALOG_FLOW.consoleUserType;
      break;
  }
  if (!serviceId) throw Error(`Unknown serviceId for service ${service}`);

  const site = await ecl.getSiteInfos(service, serviceId);
  if (!site)
    throw Error(`Unknown Site for service ${service} with id ${serviceId}`);

  const concierges = await ecl.getConciergeList(site.code);
  if (withUser) {
    if (!userIdType || !userId)
      throw Error(`Cannot find User for service ${service}`);
    user = await ecl.getUser(userIdType, userId, site);
    if (!user) user = email ? await ecl.getUser('email', email, site) : null;
  }

  const ctx = {
    service,
    serviceId,
    userId,
    site,
    concierges,
    user,
    email
  };
  logger.info('Context', ctx);
  return ctx;
};

export const checkOriginalIntent = async (
  ctx: EclContext,
  req: $Subtype<express$Request>,
  res: string[],
  context: Object,
  agent: WebhookClient
) => {
  // Restore original data from context in case of previous intent before registration
  const original =
    context && context.parameters ? context.parameters.original : null;
  if (original) {
    // Get user email from Dialogflow Context params if not in ECL Context
    if (
      !ctx.user &&
      !ctx.email &&
      context &&
      context.parameters &&
      context.parameters.email
    ) {
      ctx.email = context.parameters.email;
    }
    // Call original intent
    const contexts = [];
    switch (original.intent) {
      case config.DIALOG_FLOW.intent.globalRequest:
        await recordGlobalRequest(
          ctx,
          original.request,
          original.params,
          req,
          res,
          contexts
        );
        break;
      default:
        break;
    }
    // Set all new context
    contexts.forEach(item => agent.setContext(item));
  }
};
