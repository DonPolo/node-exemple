// @flow

/**
 * Dialogflow Controller
 */
import HTTPStatus from 'http-status';
// import request from 'request';
import { WebhookClient } from 'dialogflow-fulfillment';

import { logger } from '../config/winston';
import config from '../config/constants';

import intentSite from '../services/dialogflow/site';
import intentCommon from '../services/dialogflow/common';
import intentRequest from '../services/dialogflow/request';
import intentRegistration from '../services/dialogflow/registration';

const FORWARD_TO_LIFEE_V1 = false;

const callIntent = async (
  intentCb: (
    WebhookClient,
    $Subtype<express$Request>,
    string[]
  ) => Promise<void>,
  agent: WebhookClient,
  req: $Subtype<express$Request>
) => {
  try {
    logger.info('==> Intent', {
      intent: agent.intent,
      query: agent.query,
      parameters: agent.parameters,
      contexts: agent.contexts
    });
    const res = [];
    await intentCb(agent, req, res);
    const response = res.join('\n');
    logger.info('==> Response', { text: response });
    if (response.length) agent.add(response);
  } catch (error) {
    logger.error('==> Error', error);
  }
};

export async function webhook(
  req: $Subtype<express$Request>,
  res: express$Response,
  next: express$NextFunction
) {
  try {
    const client = new WebhookClient({ request: req, response: res });
    logger.info('Dialogflow Request', {
      headers: req.headers,
      body: req.body
    });

    const intents: Array<{
      name: ?string,
      func: (
        WebhookClient,
        $Subtype<express$Request>,
        string[]
      ) => Promise<void>
    }> = [
      {
        name: config.DIALOG_FLOW.intent.contact,
        func: intentSite.contact
      },
      {
        name: config.DIALOG_FLOW.intent.schedule,
        func: intentSite.schedule
      },
      {
        name: config.DIALOG_FLOW.intent.relaisColis,
        func: intentSite.relaisColis
      },
      {
        name: config.DIALOG_FLOW.intent.services,
        func: intentSite.services
      },
      {
        name: config.DIALOG_FLOW.intent.infos,
        func: intentSite.infos
      },
      {
        name: config.DIALOG_FLOW.intent.globalRequest,
        func: intentRequest.globalRequest
      },
      {
        name: config.DIALOG_FLOW.intent.globalRequestDetails,
        func: intentRequest.details
      },
      {
        name: config.DIALOG_FLOW.intent.searchUserByMail,
        func: intentCommon.userAskMail
      },
      {
        name: config.DIALOG_FLOW.intent.needRegistration,
        func: intentCommon.needRegistration
      },
      {
        name: config.DIALOG_FLOW.intent.registration,
        func: intentRegistration.registration
      },
      {
        name: config.DIALOG_FLOW.intent.registerLastName,
        func: intentRegistration.registerLastName
      },
      {
        name: config.DIALOG_FLOW.intent.registerGivenName,
        func: intentRegistration.registerGivenName
      },
      {
        name: config.DIALOG_FLOW.intent.registerSiteGroup,
        func: intentRegistration.registerSiteGroup
      },
      {
        name: config.DIALOG_FLOW.intent.fallback,
        func: intentCommon.fallback
      }
    ];
    const intentMap = new Map();
    intents.forEach(intent => {
      intentMap.set(intent.name, agent => callIntent(intent.func, agent, req));
    });

    await client.handleRequest(intentMap);
    return res;
  } catch (error) {
    if (FORWARD_TO_LIFEE_V1) {
      try {
        // Forward not found intent to Lifee v1
        req
          .post({
            url: 'http://ecl-sem.easy-life.fr/lifee/lifee.php',
            body: req.body,
            json: true
          })
          .on('error', err => {
            logger.error('Unable to forward request to Lifee v1', err);
            return next(err);
          })
          .pipe(res);
        return res;
      } catch (err) {
        logger.error('Unable to forward request to Lifee v1', err);
      }
    }
    error.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(error);
  }
}
