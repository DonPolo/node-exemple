// @flow
import { WebhookClient } from 'dialogflow-fulfillment';

import config from '../../config/constants';
import Ecl from '../../models/ecl';
import { sendMessage } from '../message';
import {
  MAX_LIFESPAN,
  hasParameters,
  getContext,
  checkOriginalIntent
} from '.';

export const startRegistration = (
  email: string,
  original: ?Object,
  req: $Subtype<express$Request>,
  res: string[],
  contexts: any[]
) => {
  res.push(req.t('intent.register.start'));
  res.push(req.t('intent.register.ask_last_name'));
  const contextUserRegistration = {
    name: config.DIALOG_FLOW.context.userRegistration,
    lifespan: MAX_LIFESPAN,
    parameters: {
      email,
      original
    }
  };
  contexts.push(contextUserRegistration);
};

const intentRegistration = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  // User email is needed
  let email = hasParameters(agent.parameters.email)
    ? agent.parameters.email
    : null;
  let original;
  if (!email) {
    // Try to get email from a previous context
    const context = agent.getContext(
      config.DIALOG_FLOW.context.needRegistration
    );
    if (context && context.parameters)
      ({ providedMail: email, original } = context.parameters);
  }
  const ctx = await getContext(agent, true, email);
  if (ctx.user) {
    // Already registered
    res.push(req.t('intent.register.already_registered'));
  } else if (!email) {
    // Ask user email
    res.push(req.t('intent.register.ask_email'));
    const contextAskMail = {
      name: config.DIALOG_FLOW.context.askUserMail,
      lifespan: MAX_LIFESPAN,
      parameters: {
        original: {
          request: agent.query,
          intent: config.DIALOG_FLOW.intent.registration,
          params: agent.parameters
        }
      }
    };
    agent.setContext(contextAskMail);
  } else {
    // Start registration
    const contexts = [];
    startRegistration(email, original, req, res, contexts);
    contexts.forEach(item => agent.setContext(item));
  }
};

const intentRegisterLastName = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent, true);
  if (ctx.user) {
    // Already registered
    res.push(req.t('intent.register.already_registered'));
  } else {
    // User lastName is needed
    const lastName = hasParameters(agent.parameters['last-name'])
      ? agent.parameters['last-name']
      : null;
    if (!lastName) {
      res.push(req.t('intent.register.ask_last_name'));
    } else {
      const contextUserRegistration = agent.getContext(
        config.DIALOG_FLOW.context.userRegistration
      );
      if (contextUserRegistration) {
        res.push(req.t('intent.register.ask_given_name'));
        contextUserRegistration.lifespan = MAX_LIFESPAN;
        contextUserRegistration.parameters.lastName = lastName;
        // Switch to context 'register given name' and remove previous one 'user registration'
        contextUserRegistration.name =
          config.DIALOG_FLOW.context.userRegisterGivenName;
        agent.setContext(contextUserRegistration);
        agent.setContext({
          name: config.DIALOG_FLOW.context.userRegistration,
          lifespan: '0'
        });
      }
    }
  }
};

const intentRegisterGivenName = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent, true);
  if (ctx.user) {
    // Already registered
    res.push(req.t('intent.register.already_registered'));
  } else {
    // User givenName is needed
    const givenName = hasParameters(agent.parameters['given-name'])
      ? agent.parameters['given-name']
      : null;
    if (!givenName) {
      res.push(req.t('intent.register.ask_given_name'));
    } else {
      const context = agent.getContext(
        config.DIALOG_FLOW.context.userRegisterGivenName
      );
      if (context && context.parameters.email && context.parameters.lastName) {
        // Send registration request by mail
        await sendMessage(
          {
            from: config.MAIL.sender,
            to: ctx.site.email,
            subject: `[Lifee] Nouvelle inscription à saisir`,
            text:
              `Salut ${Ecl.getPrenomConcierge(
                ctx.concierges,
                false
              )}, c'est Lifee !\n\n` +
              "L'utilisateur suivant souhaite s'inscrire:" +
              `\n\n  Son nom: ${context.parameters.lastName}` +
              `\n  Son Prénom: ${givenName}` +
              `\n  Son Email: ${context.parameters.email}` +
              `\n  Son N°: ${ctx.userId || '?'}` +
              `\n\nMerci de procéder à son inscription.\n\nBonne journée !`
          },
          true
        );
        res.push(
          req.t('intent.register.done', {
            count: ctx.concierges.length,
            conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
          })
        );
        await checkOriginalIntent(ctx, req, res, context, agent);
        // Remove outgoing ask mail context used to keep initial request
        agent.setContext({ name: context.name, lifespan: '0' });
      }
    }
  }
};

export default {
  registration: intentRegistration,
  registerLastName: intentRegisterLastName,
  registerGivenName: intentRegisterGivenName
};
