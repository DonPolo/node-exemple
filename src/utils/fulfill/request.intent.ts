import { IntentRequest, IntentResult, Response } from '../types.util';
import Ecl, { RequestType } from '../../models/ecl';
import config from '../../config';
import { sendMessage } from '../message.util';
import responsemanager from '../responsemanager.util';
import logger from '../../config/logger';

const ecl = new Ecl();

// TODO change that to return IntentResult
async function recordGlobalRequest(request: IntentRequest): Promise<number> {
  let numLocker = undefined;
  const loc = request.entities.filter(e => e.name === 'place');
  const num = request.entities.filter(e => e.name === 'builtin.number');
  if (
    loc.length > 0 &&
    loc[0].value.toLowerCase() === 'casier' &&
    num.length > 0
  ) {
    numLocker = parseInt(num[0].value, 10);
  }
  if (!request.contexts.other) request.contexts.other = {};
  request.contexts.other.numLocker = numLocker;
  const type: RequestType =
    loc.length > 0 && loc[0].value.toLowerCase() === 'casier'
      ? 'casier'
      : 'SMS';
  const newRequest = {
    type,
    numLocker,
    text: request.query,
  };
  let result = 0;
  try {
    let requestRef: string;
    const user = await ecl.getUser(
      request.contexts.user.type,
      request.contexts.user.userId,
      request.contexts.site,
    );
    if (user) {
      requestRef = await ecl.saveRequest(
        newRequest,
        request.contexts.site,
        request.contexts.site.concierges.concierges,
        user,
      );
      request.contexts.user.request = {
        type,
        numLocker,
        text: request.query,
        ref: requestRef,
      };
      await sendMessage(
        {
          from: config.MAIL.sender,
          to: request.contexts.site.email,
          subject: `[Lifee] Nouvelle demande ${newRequest.type}`,
          text: `Salut ${
            request.contexts.site.concierges.prenomsconcierges
          }, c'est Lifee !\n\n
          ${request.contexts.user.firstname} ${
            request.contexts.user.lastname
          } m'a chargé de te transmettre une demande ${newRequest.type}.\n\n
          Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin.
          \n\n  Son Email: ${request.contexts.user.email}
          \n  Son N°: ${request.contexts.user.userId || '?'}
          \n  Son message: ${newRequest.text}
          \n\nLa demande est enregistrée dans l'ECL sous la référence ${requestRef}
          \n\nBonne journée !`,
        },
        false,
      );
    } else {
      // Send request by mail
      await sendMessage(
        {
          from: config.MAIL.sender,
          to: request.contexts.site.email,
          subject: `[Lifee] Nouvelle demande ${newRequest.type} à saisir`,
          text: `Salut ${
            request.contexts.site.concierges.prenomsconcierges
          }, c'est Lifee !\n\n
            Un utilisateur non inscrit m'a chargé de vous transmettre une demande ${
              newRequest.type
            }.\n\n
            Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin.
            \n\n  Son Email: ${request.contexts.user.email}
            \n  Son N°: ${request.contexts.user.userId || '?'}
            \n  Son message: ${newRequest.text}
            \n\nBonne journée !`,
        },
        true,
      );
    }
    // Write text
    if (numLocker) {
      result = 2;
    } else if (loc.length > 0 && loc[0].value.toLowerCase() === 'casier') {
      result = 3;
    } else {
      result = 4;
    }
  } catch (ex) {
    logger.error(ex);
    result = 1;
  }
  return result;
}

async function updateGlobalRequest(request: IntentRequest): Promise<number> {
  if (!request.contexts.user.request) return 0;
  const requestRef = request.contexts.user.request.ref;
  const email = request.contexts.user.email;
  const user = await ecl.getUser(
    request.contexts.user.type,
    request.contexts.user.userId,
    request.contexts.site,
  );
  if (!user) return 0;
  let numLocker;
  const num = request.entities.filter(e => e.name === 'builtin.number');
  if (num.length > 0) numLocker = parseInt(num[0].value, 10);
  request.contexts.other.numLocker = numLocker;
  let success = false;
  let result = 0;
  try {
    await ecl.updateRequest(requestRef, {
      numLocker,
      text: request.query,
      type: numLocker ? 'casier' : 'SMS',
    });
    // Send request by mail
    await sendMessage(
      {
        from: config.MAIL.sender,
        to: request.contexts.site.email,
        subject: `[Lifee] Suite de la demande ${requestRef}`,
        text: `Salut ${
          request.contexts.site.concierges.prenomsconcierges
        }, c'est Lifee !\n\n
          ${user.prenom} ${user.nom} : 'Un utilisateur'
            m'a chargé de mettre à jour la demande ${requestRef}, avec un complément.\n\n
          Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin.
          \n\n  Son Email: ${email || (user && user.email ? user.email : '?')}
          \n  Son N°: ${
            user && user.telephone
              ? user.telephone
              : request.contexts.user.userId || '?'
          }
          \n  Son message: ${request}
          \n\nLa demande est mise à jour dans l'ECL
          \n\nBonne journée !`,
      },
      false,
    );
    success = true;
  } catch (error) {
    logger.error(error);
    // Send request by mail
    await sendMessage(
      {
        from: config.MAIL.sender,
        to: request.contexts.site.email,
        subject: `[Lifee] Suite de la demande ${requestRef}`,
        text: `Salut ${
          request.contexts.site.concierges.prenomsconcierges
        }, c'est Lifee !\n\n
          ${user.prenom} ${user.nom} : 'Un utilisateur'
            m'a chargé de mettre à jour la demande ${requestRef}, avec un complément.\n\n
          Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin.
          \n\n  Son Email: ${email || (user && user.email ? user.email : '?')}
          \n  Son N°: ${
            user && user.telephone
              ? user.telephone
              : request.contexts.user.userId || '?'
          }
          \n  Son message: ${request}
          \n\nLa demande est mise à jour dans l'ECL
          \n\nBonne journée !`,
      },
      false,
    );
  } finally {
    if (success) {
      if (numLocker) {
        result = 1;
      } else {
        result = 2;
      }
    } else {
      if (numLocker) {
        result = 3;
      } else {
        result = 4;
      }
    }
  }
  return result;
}

async function global(request: IntentRequest): Promise<IntentResult> {
  let response: Response;
  const confidence = request.confidence;
  if (!request.contexts.user.registered) {
    // Start registration
    request.contexts.fulfill.push(config.CONTEXTS.FULFILL.register);
    response = await responsemanager.load('request.needregistration');
  } else {
    if (
      !request.contexts.fulfill.includes(config.CONTEXTS.FULFILL.requestdetails)
    ) {
      const result = await recordGlobalRequest(request);
      let respo: string;
      switch (result) {
        case 0:
          respo = 'register.notcomplete';
          break;
        case 1:
          respo = 'request.recordfail';
          break;
        case 2:
          respo = 'request.recordwithlocker';
          request.contexts.fulfill.push(config.CONTEXTS.FULFILL.requestdetails);
          break;
        case 3:
          respo = 'request.recordwithlockernonumber';
          request.contexts.fulfill.push(config.CONTEXTS.FULFILL.requestdetails);
          break;
        case 4:
          respo = 'request.recordwithoutlocker';
          request.contexts.fulfill.push(config.CONTEXTS.FULFILL.requestdetails);
          break;
        default:
          respo = 'default.fallback';
          break;
      }
      response = await responsemanager.load(respo);
    } else {
      request.contexts.fulfill = request.contexts.fulfill.filter(
        c => c !== config.CONTEXTS.FULFILL.requestdetails,
      );
      const result = await updateGlobalRequest(request);
      let respo: string;
      switch (result) {
        case 1:
          respo = 'request.updatedwithlocker';
          break;
        case 2:
          respo = 'request.updatednolocker';
          break;
        case 3:
          respo = 'request.updatesentwithlocker';
          break;
        case 4:
          respo = 'request.updatesentnolocker';
          break;
        default:
          respo = 'default.fallback';
          break;
      }
      response = await responsemanager.load(respo);
    }
  }
  const res: IntentResult = {
    response,
    confidence,
    contexts: request.contexts,
  };
  return res;
}

async function details(request: IntentRequest): Promise<IntentResult> {
  let response: Response;
  let confidence = request.confidence;
  if (
    !request.contexts.fulfill.includes(
      config.CONTEXTS.FULFILL.requestdetails,
    ) ||
    !request.contexts.user.request
  ) {
    confidence = 0;
    response = await responsemanager.load('default.fallbback');
  } else {
    const result = await updateGlobalRequest(request);
    request.contexts.fulfill = request.contexts.fulfill.filter(
      c => c !== config.CONTEXTS.FULFILL.requestdetails,
    );
    let respo: string;
    switch (result) {
      case 1:
        respo = 'request.updatedwithlocker';
        break;
      case 2:
        respo = 'request.updatednolocker';
        break;
      case 3:
        respo = 'request.updatesentwithlocker';
        break;
      case 4:
        respo = 'request.updatesentnolocker';
        break;
      default:
        respo = 'register.notcomplete';
        break;
    }
    response = await responsemanager.load(respo);
  }
  const res: IntentResult = {
    response,
    confidence,
    contexts: request.contexts,
  };
  return res;
}

export default {
  global,
  details,
};
