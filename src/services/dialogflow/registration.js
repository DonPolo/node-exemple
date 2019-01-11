// @flow
import { WebhookClient } from 'dialogflow-fulfillment';

import { logger } from '../../config/winston';
import config from '../../config/constants';
import Ecl from '../../models/ecl';
import { sendMessage } from '../message';
import {
  MAX_LIFESPAN,
  hasParameters,
  getContext,
  checkOriginalIntent
} from '.';

import type { SiteGroup } from '../../models/ecl';
import type { EclContext } from '.';

const ecl = new Ecl();

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

const saveRegistration = async (
  ctx: EclContext,
  email: string,
  lastName: string,
  givenName: string,
  siteGroup: SiteGroup,
  req: $Subtype<express$Request>,
  res: string[],
  context: Object,
  agent: WebhookClient
) => {
  try {
    if (!siteGroup) {
      // TODO: notify service-si
    }
    // Store registration request in database
    const token = await ecl.saveRegistration(
      ctx.site,
      ctx.userId,
      email,
      lastName,
      givenName,
      siteGroup
    );
    const link = `${config.ECL.url}/inscription/verif_email.php?tok=${token}`;
    // Send user mail validation
    await sendMessage(
      {
        from: ctx.site.email,
        to: email,
        subject: 'Votre inscription à la Conciergerie',
        html:
          '<html>' +
          '<head>' +
          ' <style type="text/css">' +
          '   p {' +
          '     text-align: justify;' +
          '     font-family:Calibri, sans-serif;' +
          '   }' +
          ' </style>' +
          '</head>' +
          '<body>' +
          ` <p>Bonjour ${givenName},</p><br />` +
          ' <p>Nous avons bien pris en compte votre inscription à la conciergerie. ' +
          'Afin de vérifier votre adresse mail, merci de cliquer sur le lien suivant:</p>' +
          ` <a href="${link}">Vérifier mon adresse mail</a>` +
          ' <p>Une fois votre adresse vérifiée, votre compte sera actif dans les deux jours ouvrables suivant votre inscription.</p><br>' +
          ' <p>À très bientôt à la conciergerie !</p>' +
          ' <p>Au plaisir de vous rendre service.</p>' +
          '</body>' +
          '</html>'
      },
      true
    );
    res.push(
      req.t('intent.register.done_after_validation', {
        count: ctx.concierges.length,
        conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
      })
    );
  } catch (error) {
    logger.error('Registration request error:', error);
    // Send registration request by mail to concierge
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
          `\n  Sa conciergerie: ${ctx.site.libelle || '?'}` +
          `\n  Son code de regroupement: ${siteGroup.nom || '?'}` +
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
  }
  await checkOriginalIntent(ctx, req, res, context, agent);
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
  // Try to get email from a previous context if needed and the original request (before starting registration)
  const context = agent.getContext(config.DIALOG_FLOW.context.needRegistration);
  if (context && context.parameters) {
    if (!email) ({ providedMail: email } = context.parameters);
    ({ original } = context.parameters);
    // Remove outgoing need registration context used to keep initial request
    agent.setContext({ name: context.name, lifespan: '0' });
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
    const context = agent.getContext(
      config.DIALOG_FLOW.context.userRegistration
    );
    if (!lastName) {
      res.push(req.t('intent.register.ask_last_name'));
      if (context) {
        // Restore lifespan of context
        context.lifespan = MAX_LIFESPAN;
        agent.setContext(context);
      }
    } else if (context) {
      res.push(req.t('intent.register.ask_given_name'));
      context.lifespan = MAX_LIFESPAN;
      context.parameters.lastName = lastName;
      // Switch to context 'register given name' and remove previous one 'user registration'
      context.name = config.DIALOG_FLOW.context.userRegisterGivenName;
      agent.setContext(context);
      agent.setContext({
        name: config.DIALOG_FLOW.context.userRegistration,
        lifespan: '0'
      });
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
    const context = agent.getContext(
      config.DIALOG_FLOW.context.userRegisterGivenName
    );
    if (!givenName) {
      res.push(req.t('intent.register.ask_given_name'));
      if (context) {
        // Restore lifespan of context
        context.lifespan = MAX_LIFESPAN;
        agent.setContext(context);
      }
    } else {
      // User site group is needed
      const groups = await ecl.getSiteGroups(ctx.site.id);
      // If only one site group register directly
      if (
        context &&
        context.parameters.email &&
        context.parameters.lastName &&
        groups.length <= 1
      ) {
        await saveRegistration(
          ctx,
          context.parameters.email,
          context.parameters.lastName,
          givenName,
          groups.length ? groups[0] : null,
          req,
          res,
          context,
          agent
        );
        // Remove outgoing ask mail context used to keep initial request
        agent.setContext({ name: context.name, lifespan: '0' });
      } else if (context) {
        // Ask user site group
        // User must reply with site group index number
        res.push(req.t('intent.register.ask_site_group'));
        groups.forEach((group, index) => {
          res.push(
            req.t('intent.register.give_site_group_choice', {
              number: index + 1,
              name: group.nom
            })
          );
        });
        context.lifespan = MAX_LIFESPAN;
        context.parameters.givenName = givenName;
        // Switch to context 'register site group' and remove previous one 'register given name'
        context.name = config.DIALOG_FLOW.context.userRegisterSiteGroup;
        agent.setContext(context);
        agent.setContext({
          name: config.DIALOG_FLOW.context.userRegisterGivenName,
          lifespan: '0'
        });
      }
    }
  }
};

const intentRegisterSiteGroup = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent, true);
  if (ctx.user) {
    // Already registered
    res.push(req.t('intent.register.already_registered'));
  } else {
    // User site group is needed
    const siteGroupNumber = agent.parameters.choice
      ? parseInt(agent.parameters.choice, 10)
      : null;
    // Check given number exists in ECL
    const groups = await ecl.getSiteGroups(ctx.site.id);
    const siteGroup =
      siteGroupNumber && siteGroupNumber > 0 && siteGroupNumber <= groups.length
        ? groups[siteGroupNumber - 1]
        : undefined;
    const context = agent.getContext(
      config.DIALOG_FLOW.context.userRegisterSiteGroup
    );
    if (!siteGroup) {
      res.push(
        req.t('intent.register.ask_site_group_again', {
          max: groups.length
        })
      );
      if (context) {
        // Restore lifespan of context
        context.lifespan = MAX_LIFESPAN;
        agent.setContext(context);
      }
    } else if (
      context &&
      context.parameters.email &&
      context.parameters.lastName &&
      context.parameters.givenName
    ) {
      await saveRegistration(
        ctx,
        context.parameters.email,
        context.parameters.lastName,
        context.parameters.givenName,
        siteGroup,
        req,
        res,
        context,
        agent
      );
      // Remove outgoing ask mail context used to keep initial request
      agent.setContext({ name: context.name, lifespan: '0' });
    }
  }
};

export default {
  registration: intentRegistration,
  registerLastName: intentRegisterLastName,
  registerGivenName: intentRegisterGivenName,
  registerSiteGroup: intentRegisterSiteGroup
};
