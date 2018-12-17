// @flow
import { WebhookClient } from 'dialogflow-fulfillment';

import { logger } from '../../config/winston';
import config from '../../config/constants';
import Ecl from '../../models/ecl';
import { sendMessage } from '../message';
import { MAX_LIFESPAN, getContext } from '.';

import type { EclContext } from '.';

const ecl = new Ecl();

export const recordGlobalRequest = async (
  ctx: EclContext,
  request: string,
  params: Object,
  req: $Subtype<express$Request>,
  res: string[],
  contexts: any[]
) => {
  // let service;
  let numLocker;
  // if (hasParameters(params.Service_Boulangerie)) {
  //   service = 'boulangerie';
  // } else if (hasParameters(params.Service_Easystore_Nespresso)) {
  //   service = 'Nespresso';
  // } else if (hasParameters(params.Service_Panier)) {
  //   service = 'panier du marché';
  // } else if (hasParameters(params.Service_Pressing)) {
  //   service = 'pressing';
  // } else if (hasParameters(params.Service_RecherchePrestataire)) {
  //   service = 'recherche de prestataire';
  // } else if (hasParameters(params.Service_Retouche)) {
  //   service = 'retouche';
  // } else if (hasParameters(params.Service_MidiMalin)) {
  //   service = 'midi malin';
  // }
  if (params.Location && params.Location === 'Casier' && params.numeroCasier) {
    numLocker = parseInt(params.numeroCasier, 10);
  }
  const { site, concierges, user, email } = ctx;
  const newRequest = {
    text: request,
    type: params.Location && params.Location === 'Casier' ? 'casier' : 'SMS',
    numLocker
  };
  try {
    let requestRef;
    if (user) {
      // Save request in ECL
      requestRef = await ecl.saveRequest(newRequest, site, concierges, user);
      // Send request by mail
      await sendMessage(
        {
          from: config.MAIL.sender,
          to: site.email,
          subject: `[Lifee] Nouvelle demande ${newRequest.type}`,
          text:
            `Salut ${Ecl.getPrenomConcierge(
              concierges,
              false
            )}, c'est Lifee !\n\n` +
            `${user.prenom} ${
              user.nom
            } m'a chargé de te transmettre une demande ${
              newRequest.type
            }.\n\n` +
            "Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin." +
            `\n\nSon Email: ${user.email}` +
            `\nSon N°: ${user.telephone || ctx.userId || '?'}` +
            `\nSon message: ${newRequest.text}` +
            `\n\nLa demande est enregistrée dans l'ECL sous la référence ${requestRef}` +
            `\n\nBonne journée !`
        },
        false
      );
      if (!res.length) res.push(req.t('intent.globalRequest.done'));
      res.push(req.t('intent.globalRequest.recorded'));
    } else if (email) {
      // Send request by mail
      await sendMessage(
        {
          from: config.MAIL.sender,
          to: site.email,
          subject: `[Lifee] Nouvelle demande ${newRequest.type} à saisir`,
          text:
            `Salut ${Ecl.getPrenomConcierge(
              concierges,
              false
            )}, c'est Lifee !\n\n` +
            `Un utilisateur non inscrit m'a chargé de vous transmettre une demande ${
              newRequest.type
            }.\n\n` +
            "Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin." +
            `\n\nSon Email: ${email}` +
            `\nSon N°: ${ctx.userId || '?'}` +
            `\nSon message: ${newRequest.text}` +
            `\n\nBonne journée !`
        },
        true
      );
      res.push(
        req.t('intent.globalRequest.unregistered_recorded', {
          count: ctx.concierges.length,
          conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
        })
      );
    }
    if (numLocker)
      // Indicates understood locker number
      res.push(
        req.t('intent.globalRequest.recorded_with_locker', {
          count: ctx.concierges.length,
          conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges),
          numLocker
        })
      );
    else if (params.Location && params.Location === 'Casier') {
      // Ask locker number
      contexts.push({
        name: config.DIALOG_FLOW.context.userRequestLocker,
        lifespan: 1,
        parameters: {
          requestRef,
          email
        }
      });
      res.push(
        req.t('intent.globalRequest.recorded_ask_locker', {
          count: ctx.concierges.length,
          conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
        })
      );
    } else {
      // Offer a chance to add details to the request
      contexts.push({
        name: config.DIALOG_FLOW.context.userRequestDetails,
        lifespan: 1,
        parameters: {
          requestRef,
          email
        }
      });
      res.push(req.t('intent.globalRequest.recorded_ask_details'));
    }
  } catch (error) {
    try {
      logger.error('Global Request Error', error);
      // Send mail in case of failure
      await sendMessage(
        {
          from: config.MAIL.sender,
          to: site.email,
          subject: `[Lifee] Nouvelle demande ${newRequest.type} à saisir`,
          text:
            `Salut ${Ecl.getPrenomConcierge(
              concierges,
              false
            )}, c'est Lifee !\n\n` +
            `${
              user ? `${user.prenom} ${user.nom}` : 'Un utilisateur non inscrit'
            } m'a chargé de vous transmettre une demande ${
              newRequest.type
            } que je n'ai pas pu enregistrer dans l'ECL.\n\n` +
            "Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin." +
            `\n\nSon Email: ${email ||
              (user && user.email ? user.email : '?')}` +
            `\nSon N°: ${ctx.userId || '?'}` +
            `\nSon message: ${newRequest.text}` +
            `\n\nBonne journée !`
        },
        true
      );
      res.push(
        req.t('intent.globalRequest.recorded_mail_only', {
          count: ctx.concierges.length,
          conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
        })
      );
    } catch (error2) {
      logger.error('Global Request Error', error2);
      res.push(
        req.t('intent.globalRequest.recorded_error', {
          count: ctx.concierges.length,
          conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
        })
      );
    }
  }
};

const intentGlobalRequest = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent, true);
  let contextUserAskMail = agent.getContext(
    config.DIALOG_FLOW.context.askUserMail
  );
  if (!ctx.user) {
    res.push(req.t('intent.globalRequest.user_unknown'));
    res.push(req.t('intent.searchByMail.ask_email'));
    if (!contextUserAskMail) {
      contextUserAskMail = {
        name: config.DIALOG_FLOW.context.askUserMail,
        lifespan: MAX_LIFESPAN,
        parameters: {
          original: {
            request: agent.query,
            intent: config.DIALOG_FLOW.intent.globalRequest,
            params: agent.parameters
          }
        }
      };
    } else contextUserAskMail.lifespan = MAX_LIFESPAN;
    agent.setContext(contextUserAskMail);
  } else {
    const contexts = [];
    await recordGlobalRequest(
      ctx,
      agent.query,
      agent.parameters,
      req,
      res,
      contexts
    );
    contexts.forEach(item => agent.setContext(item));
    if (contextUserAskMail) {
      // Remove outgoing ask mail context used to keep initial request
      agent.setContext({ name: contextUserAskMail.name, lifespan: '0' });
    }
  }
};

const intentGlobalRequestLocker = async (
  agent: WebhookClient,
  req: $Subtype<express$Request>,
  res: string[]
) => {
  const ctx = await getContext(agent, true);
  const context = agent.getContext(
    config.DIALOG_FLOW.context.userRequestLocker
  );
  if (!context) throw Error('Missing context');

  const { requestRef, email } = context.parameters;
  let numLocker;
  if (agent.parameters.numeroCasier)
    numLocker = parseInt(agent.parameters.numeroCasier, 10);

  if (requestRef) {
    try {
      // Update request in ECL
      await ecl.updateRequest(requestRef, {
        text: agent.query,
        type: 'casier',
        numLocker
      });
      // Send request by mail
      await sendMessage(
        {
          from: config.MAIL.sender,
          to: ctx.site.email,
          subject: `[Lifee] Suite de la demande ${requestRef}`,
          text:
            `Salut ${Ecl.getPrenomConcierge(
              ctx.concierges,
              false
            )}, c'est Lifee !\n\n` +
            `${
              ctx.user ? `${ctx.user.prenom} ${ctx.user.nom}` : 'Un utilisateur'
            } m'a chargé de mettre à jour la demande ${requestRef}, avec un complément.\n\n` +
            "Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin." +
            `\n\nSon Email: ${email ||
              (ctx.user && ctx.user.email ? ctx.user.email : '?')}` +
            `\nSon N°: ${
              ctx.user && ctx.user.telephone
                ? ctx.user.telephone
                : ctx.userId || '?'
            }` +
            `\nSon message: ${agent.query}` +
            `\n\nLa demande est mise à jour dans l'ECL` +
            `\n\nBonne journée !`
        },
        false
      );

      res.push(req.t('intent.globalRequest_locker.updated'));
    } catch (error) {
      logger.error('Global Request Locker error', error);
      // Send request update by mail
      await sendMessage(
        {
          from: config.MAIL.sender,
          to: ctx.site.email,
          subject: `[Lifee] Suite d'une demande à saisir`,
          text:
            `Salut ${Ecl.getPrenomConcierge(
              ctx.concierges,
              false
            )}, c'est Lifee !\n\n` +
            `${
              ctx.user ? `${ctx.user.prenom} ${ctx.user.nom}` : 'Un utilisateur'
            } m'a chargé de préciser la demande ${requestRef}, que je n'ai pas pu enregistrer dans l'ECL.\n\n` +
            "Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin." +
            `\n\nSon Email: ${email ||
              (ctx.user && ctx.user.email ? ctx.user.email : '?')}` +
            `\nSon N°: ${ctx.userId || '?'}` +
            `\nSon message: ${agent.query}` +
            `\n\nBonne journée !`
        },
        true
      );
      res.push(
        req.t('intent.globalRequest_locker.update_sent', {
          count: ctx.concierges.length,
          conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
        })
      );
    } finally {
      if (numLocker)
        res.push(
          req.t('intent.globalRequest.recorded_with_locker', {
            count: ctx.concierges.length,
            conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges),
            numLocker
          })
        );
    }
  } else if (email) {
    // Send request by mail
    await sendMessage(
      {
        from: config.MAIL.sender,
        to: ctx.site.email,
        subject: `[Lifee] Suite d'une demande à saisir`,
        text:
          `Salut ${Ecl.getPrenomConcierge(
            ctx.concierges,
            false
          )}, c'est Lifee !\n\n` +
          `Un utilisateur non inscrit m'a chargé de vous préciser sa demande.\n\n` +
          "Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin." +
          `\n\nSon Email: ${email}` +
          `\nSon N°: ${ctx.userId || '?'}` +
          `\nSon message: ${agent.query}` +
          `\n\nBonne journée !`
      },
      true
    );
    res.push(
      req.t('intent.globalRequest_locker.update_sent', {
        count: ctx.concierges.length,
        conciergeGivenName: Ecl.getPrenomConcierge(ctx.concierges)
      })
    );
  }
  // Remove outgoing locker followup context used to keep request ref or user email
  agent.setContext({ name: context.name, lifespan: '0' });
};

export default {
  globalRequest: intentGlobalRequest,
  locker: intentGlobalRequestLocker
};
