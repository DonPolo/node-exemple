// @flow
import { WebhookClient } from 'dialogflow-fulfillment';

import { logger } from '../../config/winston';
import config from '../../config/constants';
import Ecl from '../../models/ecl';
import { sendMessage } from '../message';
import {
  MAX_LIFESPAN,
  getContext,
  hasParameters,
  checkOriginalIntent
} from '.';
import { startRegistration } from './registration';
import { updateGlobalRequest } from './request';

import type { EclContext } from '.';

const ecl = new Ecl();

const intentUserAskMail = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const email = hasParameters(agent.parameters.email)
    ? agent.parameters.email
    : null;
  const ctx: EclContext = await getContext(agent, true, email);
  const contextUserAskMail = agent.getContext(
    config.DIALOG_FLOW.context.askUserMail
  );
  // Restore original data from context in case of unknown user
  const original =
    contextUserAskMail && contextUserAskMail.parameters
      ? contextUserAskMail.parameters.original
      : null;
  if (!ctx || !contextUserAskMail || !original)
    throw Error('Missing context or original parameter');
  const { user } = ctx;
  if (!user) {
    if (!email) {
      // Ask again user email
      contextUserAskMail.lifespan = MAX_LIFESPAN;
      agent.setContext(contextUserAskMail);
      res.push(req.t('intent.searchByMail.ask_email'));
    } else if (original.intent === config.DIALOG_FLOW.intent.registration) {
      // Email received => start registration
      const contexts = [];
      startRegistration(email, original, req, res, contexts);
      contexts.forEach(item => agent.setContext(item));
      // Remove outgoing ask mail context used to keep initial request
      agent.setContext({ name: contextUserAskMail.name, lifespan: '0' });
    } else {
      // Email received => user not found, go to registration
      let contextNeedRegistration = agent.getContext(
        config.DIALOG_FLOW.context.needRegistration
      );
      res.push(req.t('intent.searchByMail.not_found'));
      res.push(
        req.t('intent.searchByMail.register_or_try_again', {
          email
        })
      );
      if (!contextNeedRegistration) {
        contextNeedRegistration = {
          name: config.DIALOG_FLOW.context.needRegistration,
          lifespan: MAX_LIFESPAN,
          parameters: {
            providedMail: email,
            original
          }
        };
      } else {
        contextNeedRegistration.lifespan = MAX_LIFESPAN;
        contextNeedRegistration.parameters = {
          providedMail: email,
          original
        };
      }
      agent.setContext(contextNeedRegistration);
      // Remove outgoing ask mail context used to keep initial request
      agent.setContext({ name: contextUserAskMail.name, lifespan: '0' });
    }
  } else {
    if (email) {
      res.push(req.t('intent.searchByMail.found'));
      if (ctx.service === 'twilio' && ctx.userId) {
        // Do not override new user mobile number
        if (user.telephone && user.telephone.length) {
          res.push(req.t('intent.searchByMail.other_mobile'));
        } else {
          // Save new user mobile number
          user.telephone = ctx.userId;
          try {
            await ecl.saveUserMobile(user);
            res.push(
              req.t('intent.searchByMail.save_mobile', {
                count: ctx.concierges.length,
                conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
              })
            );
          } catch (error) {
            logger.error('Cannot save new user mobile number:', error);
          }
        }
      }
    }
    await checkOriginalIntent(ctx, req, res, contextUserAskMail, agent);
    // Remove outgoing ask mail context used to keep initial request
    agent.setContext({ name: contextUserAskMail.name, lifespan: '0' });
  }
};

const intentNeedRegistration = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  // User email is needed
  const context = agent.getContext(config.DIALOG_FLOW.context.needRegistration);
  if (!context) throw Error('Missing context');
  const { providedMail: email } = context.parameters;
  if (!email) throw Error('Missing email parameter in context');
  const ctx = await getContext(agent, true, email);
  if (ctx.user) {
    // Already registered
    res.push(req.t('intent.register.already_registered'));
  } else {
    // Restore original data from context in case of unknown user
    const { original } = context.parameters;
    // Go to registration intent using a new context
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
    agent.setContext(contextUserRegistration);
    // Clear previous context
    agent.setContext({
      name: config.DIALOG_FLOW.context.askUserMail,
      lifespan: '0'
    });
    agent.setContext({
      name: config.DIALOG_FLOW.context.needRegistration,
      lifespan: '0'
    });
  }
};

const intentFallback = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx: EclContext = await getContext(agent, true);
  // Check also here if it's a request details
  const contextRequestDetails = agent.getContext(
    config.DIALOG_FLOW.context.userRequestDetails
  );
  if (contextRequestDetails) {
    // Add details to the request
    await updateGlobalRequest(
      ctx,
      agent.query,
      agent.parameters,
      contextRequestDetails.parameters,
      req,
      res
    );
    // Remove outgoing details followup context used to keep request ref or user email
    agent.setContext({ name: contextRequestDetails.name, lifespan: '0' });
  } else if (ctx.site) {
    // Send unmatched query by mail
    await sendMessage(
      {
        from: config.MAIL.sender,
        to: config.MAIL.sav,
        replyTo: ctx.site.email,
        subject: `[Lifee] Nouvelle demande incomprise`,
        text:
          "Salut, c'est Lifee !\n\n" +
          `${
            ctx.user
              ? `${ctx.user.prenom} ${ctx.user.nom}`
              : 'Un utilisateur non inscrit'
          } du site ${
            ctx.site.code
          } a fait une demande à Lifee qui ne l'a malheureusement pas comprise.` +
          `\n\n  E-mail du site: ${ctx.site.email}` +
          `\n  Son identifiant: ${ctx.userId || '?'}` +
          `\n  Son message: ${agent.query}` +
          `\n\nBonne journée !`
      },
      true
    );

    res.push(req.t('intent.fallback.not_for_me'));
    res.push(
      req.t('intent.fallback.transmitted', {
        count: ctx.concierges.length,
        conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
      })
    );
  }
  // No (=Default) response for unknown site
};

export default {
  userAskMail: intentUserAskMail,
  needRegistration: intentNeedRegistration,
  fallback: intentFallback
};
