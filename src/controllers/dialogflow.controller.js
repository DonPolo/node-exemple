// @flow

/**
 * Dialogflow Controller
 */
import HTTPStatus from 'http-status';
// import request from 'request';
import { WebhookClient } from 'dialogflow-fulfillment';

import { logger } from '../config/winston';
import config from '../config/constants';
import Ecl from '../models/ecl';
import { getSlackEmail } from '../services/slack';
import { sendMessage } from '../services/message';

const ecl = new Ecl();

const MAX_LIFESPAN = 5;
const hasParameters = param => param && param.length;

const getContext = async (agent, withUser = false, email: ?string = null) => {
  if (!agent.originalRequest) return Promise.resolve(null);

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
  if (!serviceId) return Promise.resolve(null);

  const site = await ecl.getSiteInfos(service, serviceId);
  if (!site) return Promise.resolve(null);

  const concierges = await ecl.getConciergeList(site.code);
  if (withUser) {
    if (!userIdType || !userId) return Promise.resolve(null);
    user = await ecl.getUser(userIdType, userId, site);
    if (!user) user = email ? await ecl.getUser('email', email, site) : null;
  }

  return {
    service,
    serviceId,
    userId,
    site,
    concierges,
    user: (await user) || null,
    email
  };
};

const recordGlobalRequest = async (
  ctx,
  msg: string[],
  request: string,
  params: Object,
  context: any[]
) => {
  let service;
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
  const { email } = ctx;
  const newRequest = {
    text: request,
    type: params.Location && params.Location === 'Casier' ? 'casier' : 'SMS',
    numLocker
  };
  try {
    let requestRef;
    if (ctx.user) {
      // Save request in ECL
      requestRef = await ecl.saveRequest(
        newRequest,
        ctx.site,
        ctx.concierges,
        ctx.user
      );
      // Send request by mail
      await sendMessage({
        from: config.MAIL.sender,
        to: ctx.site.email,
        subject: `[Lifee] Nouvelle demande ${newRequest.type}`,
        text:
          `Bonjour ${Ecl.getPrenomConcierge(ctx.concierges, false)},\n\n` +
          `${ctx.user.prenom} ${
            ctx.user.nom
          } m'a chargé de vous transmettre la demande ${
            newRequest.type
          } suivante:\n\n` +
          `${newRequest.text}` +
          `\n\nLa demande est enregistrée dans l'ECL sous la référence ${requestRef}` +
          `\n\nBonne journée !`
      });
      msg.push(
        `Ok c'est noté ! Votre demande ${
          service ? `de ${service} ` : ''
        }est enregistrée et disponible dans votre Espace Conciergerie en Ligne.`
      );
    } else if (email) {
      // Send request by mail
      await sendMessage({
        from: config.MAIL.sender,
        to: ctx.site.email,
        subject: `[Lifee] Nouvelle demande ${newRequest.type} à saisir`,
        text:
          `Bonjour ${Ecl.getPrenomConcierge(ctx.concierges, false)},\n\n` +
          `Un utilisateur non inscrit m'a chargé de vous transmettre la demande ${
            newRequest.type
          } suivante:\n\n` +
          `${newRequest.text}` +
          `\n\nSon e-mail : ${email}` +
          `\n\nBonne journée !`
      });
      msg.push(
        `De plus votre demande ${
          service ? `de ${service} ` : ''
        }a été envoyée à ${Ecl.getPrenomConcierge(ctx.concierges, false)}.`
      );
    }
    if (numLocker)
      msg.push(
        `${Ecl.getPrenomConcierge(ctx.concierges, true)} ${
          Ecl.isMultipleConcierges(ctx.concierges) ? 'vont' : 'va'
        } passer récupérer vos affaires dans le casier ${numLocker}.`
      );
    else if (params.Location && params.Location === 'Casier') {
      context.push({
        name: config.DIALOG_FLOW.context.userRequestLocker,
        lifespan: 1,
        parameters: {
          requestRef,
          email
        }
      });
      msg.push(
        `S'il s'agit de quelque chose que ${Ecl.getPrenomConcierge(
          ctx.concierges,
          false
        )} ${
          Ecl.isMultipleConcierges(ctx.concierges) ? 'doivent' : 'doit'
        } récupérer, pensez à m'indiquer le numéro du casier.`
      );
    }
  } catch (error) {
    try {
      logger.error('Error', error);
      // Send mail in case of failure
      await sendMessage({
        from: config.MAIL.sender,
        to: ctx.site.email,
        subject: `[Lifee] Nouvelle demande ${newRequest.type} à saisir`,
        text:
          `Bonjour ${Ecl.getPrenomConcierge(ctx.concierges, false)},\n\n` +
          `${
            ctx.user
              ? `${ctx.user.prenom} ${ctx.user.nom}`
              : 'Un utilisateur non inscrit'
          } m'a chargé de vous transmettre une demande ${
            newRequest.type
          } que je n'ai pas pu enregistrer dans l'ECL:\n\n` +
          `${newRequest.text}` +
          `${ctx.email && !ctx.user ? `\n\nSon e-mail : ${ctx.email}` : ''}` +
          `\n\nBonne journée !`
      });
      msg.push(
        "Je n'ai pas réussi à enregistrer la demande. Mais j'ai bien noté ce que vous m'aviez dit, " +
          `et j'ai transmis à ${Ecl.getPrenomConcierge(ctx.concierges, false)}`
      );
    } catch (error2) {
      msg.push(
        "Ouhla, j'ai eu un souci ! Pouvez-vous contacter le concierge ?"
      );
    }
  }
};

const checkOriginalIntent = async (
  ctx,
  msg: string[],
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
    const contexts = [];
    switch (original.intent) {
      case config.DIALOG_FLOW.intent.globalRequest:
        await recordGlobalRequest(
          ctx,
          msg,
          original.request,
          original.params,
          contexts
        );
        break;
      default:
        break;
    }
    contexts.forEach(item => agent.setContext(item));
  }
};

const intentContact = async agent => {
  try {
    const ctx = await getContext(agent);
    if (!ctx) return;
    agent.add(
      `Vous pouvez contacter ${Ecl.getPrenomConcierge(
        ctx.concierges,
        false
      )} par email à ${ctx.site.email} ou par téléphone au ${
        ctx.site.telephone
      }.\n\nVous pouvez aussi passer à la conciergerie ${ctx.site.horaires}`
    );
  } catch (error) {
    logger.error('Contact', error);
  }
};

const intentSchedule = async agent => {
  try {
    const ctx = await getContext(agent);
    if (!ctx) return;
    agent.add(
      `${Ecl.getPrenomConcierge(ctx.concierges, true)} vous accueille${
        Ecl.isMultipleConcierges(ctx.concierges) ? 'nt' : ''
      } ${ctx.site.horaires}`
    );
  } catch (error) {
    logger.error('Schedule', error);
  }
};

const intentRelaisColis = async agent => {
  try {
    const ctx = await getContext(agent);
    if (!ctx) return;
    if (ctx.site)
      agent.add(
        `Voici la liste des relais 📦 que vous pouvez utiliser pour que ${Ecl.getPrenomConcierge(
          ctx.concierges,
          false
        )} récupère${
          Ecl.isMultipleConcierges(ctx.concierges) ? 'nt' : ''
        } vos colis ${ctx.site.relaisColis}`
      );
  } catch (error) {
    logger.error('RelaisColis', error);
  }
};

const intentServices = async agent => {
  try {
    const ctx = await getContext(agent);
    if (!ctx) return;
    if (ctx.site)
      agent.add(
        `Vous trouverez la carte de nos services ici ${ctx.site.guideServices}`
      );
  } catch (error) {
    logger.error('Services', error);
  }
};

const intentInfos = async agent => {
  try {
    const ctx = await getContext(agent);
    if (!ctx) return;
    if (ctx.site)
      agent.add(
        `${Ecl.getPrenomConcierge(ctx.concierges, true)} vous accueille${
          Ecl.isMultipleConcierges(ctx.concierges) ? 'nt' : ''
        } ${
          ctx.site.horaires
        }\n\nEn-dehors des heures d’ouverture, vous pouvez envoyer un mail à ${
          ctx.site.email
        }\n\nOu appeler le ${
          ctx.site.telephone
        }\n\nVous pouvez également consulter la carte des services sur ${
          ctx.site.guideServices
        }\n\nPour connaître la liste des points relais pour vos retraits de colis, vous pouvez aller sur ${
          ctx.site.relaisColis
        }`
      );
  } catch (error) {
    logger.error('Infos', error);
  }
};

const intentUserAskMail = async agent => {
  try {
    logger.info('==> Dialogflow Intent: UserAskMail', {
      query: agent.query,
      params: agent.parameters
    });
    const msg = [];
    const email = hasParameters(agent.parameters.email)
      ? agent.parameters.email
      : null;
    const ctx = await getContext(agent, true, email);
    if (!ctx) return;
    logger.info('Context', ctx);
    const contextUserAskMail = agent.getContext(
      config.DIALOG_FLOW.context.askUserMail
    );
    // Restore original data from context in case of unknown user
    const original =
      contextUserAskMail && contextUserAskMail.parameters
        ? contextUserAskMail.parameters.original
        : null;
    if (!contextUserAskMail || !original) return;
    if (!ctx.user) {
      if (!email) {
        contextUserAskMail.lifespan = MAX_LIFESPAN;
        agent.setContext(contextUserAskMail);
        msg.push('Quelle est votre adresse e-mail ?');
      } else {
        let contextNeedRegistration = agent.getContext(
          config.DIALOG_FLOW.context.needRegistration
        );
        msg.push(
          `Apparemment vous n'êtes pas inscrit.\nSouhaitez-vous essayer un autre e-mail ou préférez-vous que je vous inscrive avec ${email} ?`
        );
        if (!contextNeedRegistration) {
          contextNeedRegistration = {
            name: config.DIALOG_FLOW.context.needRegistration,
            lifespan: MAX_LIFESPAN,
            parameters: {
              email
            }
          };
        } else {
          contextNeedRegistration.lifespan = MAX_LIFESPAN;
          contextNeedRegistration.parameters = {
            email
          };
        }
        agent.setContext(contextNeedRegistration);
      }
    } else {
      if (email) {
        // TODO save mobile number
        // msg.push(
        //   `Super je vous ai retrouvé !\nJe note votre numéro de téléphone pour plus tard (si vous ne le voulez pas, dites-le à ${Ecl.getPrenomConcierge(
        //     ctx.concierges,
        //     false
        //   )})`
        // );
        msg.push('Super je vous ai retrouvé !');
      }
      await checkOriginalIntent(ctx, msg, contextUserAskMail, agent);
      // Remove outgoing ask mail context used to keep initial request
      agent.setContext({ name: contextUserAskMail.name, lifespan: '0' });
    }
    logger.info('UserAskMail response', { text: msg.join('\n') });
    if (msg.length) agent.add(msg.join('\n'));
  } catch (error) {
    logger.error('UserAskMail', error);
  }
};

const intentGlobalRequest = async agent => {
  try {
    logger.info('==> Dialogflow Intent: GlobalRequest', {
      query: agent.query,
      params: agent.parameters
    });
    const msg = [];
    const ctx = await getContext(agent, true);
    if (!ctx) return;
    logger.info('Context', ctx);
    let contextUserAskMail = agent.getContext(
      config.DIALOG_FLOW.context.askUserMail
    );
    if (!ctx.user) {
      agent.add(
        'Apparemment on ne se connaît pas encore.\nQuelle est votre adresse e-mail ?'
      );
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
      return;
    }
    const contexts = [];
    await recordGlobalRequest(
      ctx,
      msg,
      agent.query,
      agent.parameters,
      contexts
    );
    contexts.forEach(item => agent.setContext(item));
    logger.info('GlobalRequest response', { text: msg.join('\n') });
    if (msg.length) agent.add(msg.join('\n'));

    if (contextUserAskMail) {
      // Remove outgoing ask mail context used to keep initial request
      agent.setContext({ name: contextUserAskMail.name, lifespan: '0' });
    }
  } catch (error) {
    logger.error('GlobalRequest', error);
  }
};

const intentGlobalRequestLocker = async agent => {
  try {
    logger.info('==> Dialogflow Intent: GlobalRequest Locker Followup', {
      query: agent.query,
      params: agent.parameters
    });
    const msg = [];
    const ctx = await getContext(agent, true);
    if (!ctx) return;
    logger.info('Context', ctx);
    const context = agent.getContext(
      config.DIALOG_FLOW.context.userRequestLocker
    );
    if (!context) return;

    const { requestRef, email } = context.parameters;
    let numLocker;
    if (agent.parameters.numeroCasier)
      numLocker = parseInt(agent.parameters.numeroCasier, 10);

    if (requestRef) {
      // Update request in ECL
      await ecl.updateRequest(requestRef, {
        text: agent.query,
        type: 'casier',
        numLocker
      });
      // Send request by mail
      await sendMessage({
        from: config.MAIL.sender,
        to: ctx.site.email,
        subject: `[Lifee] Suite de la demande ${requestRef}`,
        text:
          `Bonjour ${Ecl.getPrenomConcierge(ctx.concierges, false)},\n\n` +
          `${
            ctx.user ? `${ctx.user.prenom} ${ctx.user.nom}` : 'Un utilisateur'
          } m'a chargé de mettre à jour la demande ${requestRef}, avec le complément suivant :\n\n` +
          `${agent.query}` +
          `\n\nLa demande est mise à jour dans l'ECL` +
          `\n\nBonne journée !`
      });
      msg.push(`Ok c'est ajouté !`);
      if (numLocker)
        msg.push(
          `${Ecl.getPrenomConcierge(ctx.concierges, true)} ${
            Ecl.isMultipleConcierges(ctx.concierges) ? 'vont' : 'va'
          } passer récupérer vos affaires dans le casier ${numLocker}.`
        );
    } else if (email) {
      // Send request by mail
      await sendMessage({
        from: config.MAIL.sender,
        to: ctx.site.email,
        subject: `[Lifee] Suite d'une demande à saisir`,
        text:
          `Bonjour ${Ecl.getPrenomConcierge(ctx.concierges, false)},\n\n` +
          `Un utilisateur non inscrit m'a chargé de vous préciser sa demande:\n\n` +
          `${agent.query}` +
          `\n\nSon e-mail : ${email}` +
          `\n\nBonne journée !`
      });
      msg.push(
        `Ok, cette précision a été envoyée à ${Ecl.getPrenomConcierge(
          ctx.concierges,
          false
        )}.`
      );
    }
    // Remove outgoing locker followup context used to keep request ref or user email
    agent.setContext({ name: context.name, lifespan: '0' });
    logger.info('GlobalRequest Locker Followup response', {
      text: msg.join('\n')
    });
    if (msg.length) agent.add(msg.join('\n'));
  } catch (error) {
    logger.error('GlobalRequest Locker Followup', error);
  }
};
const intentNeedRegistration = async agent => {
  try {
    logger.info('==> Dialogflow Intent: Need Registration', {
      query: agent.query,
      params: agent.parameters
    });
    const msg = [];
    // User email is needed
    const context = agent.getContext(
      config.DIALOG_FLOW.context.needRegistration
    );
    if (!context) return;
    const { email } = context.parameters;
    if (!email) return;
    const ctx = await getContext(agent, true, email);
    if (!ctx) return;
    logger.info('Context', ctx);

    if (ctx.user) {
      // Already registered
      msg.push("Ce n'est pas la peine, vous êtes déjà inscrit");
    } else {
      const contextUserAskMail = agent.getContext(
        config.DIALOG_FLOW.context.askUserMail
      );
      // Restore original data from context in case of unknown user
      const original =
        contextUserAskMail && contextUserAskMail.parameters
          ? contextUserAskMail.parameters.original
          : null;
      // // Go to registration intent using event
      // agent.setFollowupEvent({
      //   name: config.DIALOG_FLOW.event.userRegistration,
      //   parameters: {
      //     email
      //   },
      //   languageCode: agent.locale
      // });
      msg.push('Ok, allons-y !\nQuel est votre nom de famille ?');
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
    logger.info('Need Registration response', { text: msg.join('\n') });
    if (msg.length) agent.add(msg.join('\n'));
  } catch (error) {
    logger.error('Need Registration', error);
  }
};

const intentRegistration = async agent => {
  try {
    logger.info('==> Dialogflow Intent: Registration', {
      query: agent.query,
      params: agent.parameters
    });
    const msg = [];
    const ctx = await getContext(agent, true);
    if (!ctx) return;
    logger.info('Context', ctx);

    if (ctx.user) {
      // Already registered
      msg.push("Ce n'est pas la peine, vous êtes déjà inscrit");
    } else {
      // User email is needed
      const email = hasParameters(agent.parameters.email)
        ? agent.parameters.email
        : null;
      if (!email) {
        // Seems to occur only when user try to cancel since email is a required parameter
        msg.push('Ok, pas de problème. On en reste là !');
      } else {
        msg.push('Ok, allons-y !\nQuel est votre nom de famille ?');
        const contextUserRegistration = {
          name: config.DIALOG_FLOW.context.userRegistration,
          lifespan: MAX_LIFESPAN,
          parameters: {
            email
          }
        };
        agent.setContext(contextUserRegistration);
      }
      logger.info('Registration response', { text: msg.join('\n') });
      if (msg.length) agent.add(msg.join('\n'));
    }
  } catch (error) {
    logger.error('Registration', error);
  }
};

const intentRegisterLastName = async agent => {
  try {
    logger.info('==> Dialogflow Intent: Register Last Name', {
      query: agent.query,
      params: agent.parameters
    });
    const msg = [];
    const ctx = await getContext(agent, true);
    if (!ctx) return;
    logger.info('Context', ctx);

    if (ctx.user) {
      // Already registered
      msg.push("Ce n'est pas la peine, vous êtes déjà inscrit");
    } else {
      // User lastName is needed
      const lastName = hasParameters(agent.parameters['last-name'])
        ? agent.parameters['last-name']
        : null;
      if (!lastName) {
        msg.push('Quel est votre nom de famille ?');
      } else {
        const contextUserRegistration = agent.getContext(
          config.DIALOG_FLOW.context.userRegistration
        );
        if (contextUserRegistration) {
          msg.push('Quel est votre prénom ?');
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
      logger.info('Register Last Name response', { text: msg.join('\n') });
      if (msg.length) agent.add(msg.join('\n'));
    }
  } catch (error) {
    logger.error('Register Last Name', error);
  }
};

const intentRegisterGivenName = async agent => {
  try {
    logger.info('==> Dialogflow Intent: Register Given Name', {
      query: agent.query,
      params: agent.parameters
    });
    const msg = [];
    const ctx = await getContext(agent, true);
    if (!ctx) return;
    logger.info('Context', ctx);

    if (ctx.user) {
      // Already registered
      msg.push("Ce n'est pas la peine, vous êtes déjà inscrit");
    } else {
      // User givenName is needed
      const givenName = hasParameters(agent.parameters['given-name'])
        ? agent.parameters['given-name']
        : null;
      if (!givenName) {
        msg.push('Quel est votre prénom ?');
      } else {
        const context = agent.getContext(
          config.DIALOG_FLOW.context.userRegisterGivenName
        );
        if (
          context &&
          context.parameters.email &&
          context.parameters.lastName
        ) {
          // Send registration request by mail
          await sendMessage({
            from: config.MAIL.sender,
            to: ctx.site.email,
            subject: `[Lifee] Nouvelle inscription à saisir`,
            text:
              `Bonjour ${Ecl.getPrenomConcierge(ctx.concierges, false)},\n\n` +
              `L'utilisateur suivant souhaite s'inscrire:\n\n` +
              `Nom: ${context.parameters.lastName}\n` +
              `Prénom: ${givenName}\n` +
              `E-mail: ${context.parameters.email}` +
              `\n\nMerci de procéder à son inscription.\n\nBonne journée !`
          });
          msg.push(
            `Super ! Votre inscription est enregistrée. ${Ecl.getPrenomConcierge(
              ctx.concierges,
              true
            )} la validera dans les 48h.`
          );
          await checkOriginalIntent(ctx, msg, context, agent);
          // Remove outgoing ask mail context used to keep initial request
          agent.setContext({ name: context.name, lifespan: '0' });
        }
      }
      logger.info('Register Given Name response', { text: msg.join('\n') });
      if (msg.length) agent.add(msg.join('\n'));
    }
  } catch (error) {
    logger.error('Register Given Name', error);
  }
};

const intentFallback = async agent => {
  try {
    logger.info('==> Dialogflow Intent: Fallback', {
      query: agent.query,
      params: agent.parameters
    });
    const ctx = await getContext(agent, true);
    if (!ctx) return;
    logger.info('Context', ctx);

    // Send unmatched query by mail
    await sendMessage({
      from: config.MAIL.sender,
      to: config.MAIL.sav,
      subject: `[Lifee] Nouvelle demande incomprise`,
      text:
        'Bonjour,\n\n' +
        `${
          ctx.user
            ? `${ctx.user.prenom} ${ctx.user.nom}`
            : 'Un utilisateur non inscrit'
        } du site ${
          ctx.site.code
        } a fait la demande suivante à Lifee qui ne l'a malheureusement pas comprise:\n\n` +
        `${agent.query}` +
        `\n\nE-mail du site: ${ctx.site.email}` +
        `\n\nBonne journée !`
    });

    const msg = [];
    msg.push(
      "Je n'ai pas bien compris ce que vous m'avez dit. Mais je suis encore jeune, j'apprends."
    );
    msg.push(
      `En attendant je transmets à ${Ecl.getPrenomConcierge(
        ctx.concierges,
        false
      )} qui un cerveau de toute beauté.`
    );
    logger.info('Fallback response', { text: msg.join('\n') });
    if (msg.length) agent.add(msg.join('\n'));
  } catch (error) {
    logger.error('Fallback', error);
  }
};
export async function webhook(
  req: $Subtype<express$Request>,
  res: express$Response,
  next: express$NextFunction
) {
  try {
    const agent = new WebhookClient({ request: req, response: res });
    logger.info('Dialogflow Request', {
      headers: req.headers,
      body: req.body
    });

    const intentMap = new Map();
    intentMap.set(config.DIALOG_FLOW.intent.contact, intentContact);
    intentMap.set(config.DIALOG_FLOW.intent.schedule, intentSchedule);
    intentMap.set(config.DIALOG_FLOW.intent.relaisColis, intentRelaisColis);
    intentMap.set(config.DIALOG_FLOW.intent.services, intentServices);
    intentMap.set(config.DIALOG_FLOW.intent.infos, intentInfos);
    intentMap.set(config.DIALOG_FLOW.intent.globalRequest, intentGlobalRequest);
    intentMap.set(
      config.DIALOG_FLOW.intent.globalRequestLocker,
      intentGlobalRequestLocker
    );
    intentMap.set(
      config.DIALOG_FLOW.intent.searchUserByMail,
      intentUserAskMail
    );
    intentMap.set(
      config.DIALOG_FLOW.intent.needRegistration,
      intentNeedRegistration
    );
    intentMap.set(config.DIALOG_FLOW.intent.registration, intentRegistration);
    intentMap.set(
      config.DIALOG_FLOW.intent.registerLastName,
      intentRegisterLastName
    );
    intentMap.set(
      config.DIALOG_FLOW.intent.registerGivenName,
      intentRegisterGivenName
    );
    intentMap.set(config.DIALOG_FLOW.intent.fallback, intentFallback);

    await agent.handleRequest(intentMap);
    return res;
  } catch (err) {
    // try {
    //   // Proxy not found intent to ECL-SEM
    //   request
    //     .post({
    //       url: 'http://ecl-sem.easy-life.fr/lifee/lifee.php',
    //       body: req.body,
    //       json: true
    //     })
    //     .on('error', err => next(err))
    //     .pipe(res);
    //   return res;
    // } catch (err) {
    err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(err);
    // }
  }
}
