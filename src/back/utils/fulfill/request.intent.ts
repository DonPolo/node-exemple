import {
  IntentRequest,
  IntentResult,
  Response,
} from '../../../types/types.util';
import Ecl, { RequestType } from '../../models/ecl';
import config from '../../config';
import { sendMessage } from '../message.util';
import responsemanager from '../responsemanager.util';
import logger from '../../config/logger';

const ecl = new Ecl();

async function recordGlobalRequest(
  request: IntentRequest,
): Promise<IntentResult> {
  let numLocker = undefined;
  const loc = request.entities.filter(
    e => e.name === 'place' || e.name === '##all##',
  );
  const num = request.entities.filter(e => e.name === 'number');
  let respo = '';
  if (loc.length > 0 && loc[0].type === 'casier' && num.length > 0) {
    numLocker = parseInt(num[0].value, 10);
  }
  if (!request.contexts.other) request.contexts.other = {};
  request.contexts.other.numLocker = numLocker;
  const type: RequestType =
    loc.length > 0 && loc[0].type === 'casier' ? 'casier' : 'SMS';
  const newRequest = {
    type,
    numLocker,
    text: request.query,
  };
  const user = await ecl.getUser(
    request.contexts.user.type,
    request.contexts.user.userId,
    request.contexts.site,
  );
  try {
    let requestRef: string;

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
    } else if (request.contexts.user.email) {
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
    } else {
      respo = 'default.fallback';
    }
    // Write text
    if (respo === '') {
      if (numLocker) {
        respo = 'request.recordwithlocker';
        request.contexts.fulfill.push(config.CONTEXTS.FULFILL.requestdetails);
      } else if (loc.length > 0 && loc[0].type === 'casier') {
        respo = 'request.recordwithlockernonumber';
        request.contexts.fulfill.push(config.CONTEXTS.FULFILL.requestdetails);
      } else {
        respo = 'request.recordwithoutlocker';
        request.contexts.fulfill.push(config.CONTEXTS.FULFILL.requestdetails);
      }
    }
  } catch (ex) {
    logger.error(ex);
    try {
      // Send mail in case of failure
      await sendMessage(
        {
          from: config.MAIL.sender,
          to: request.contexts.site.email,
          subject: `[Lifee] Nouvelle demande ${newRequest.type} à saisir`,
          text: `Salut ${
            request.contexts.site.concierges.prenomsconcierges
          }, c'est Lifee !\n\n
            ${
              user ? `${user.prenom} ${user.nom}` : 'Un utilisateur non inscrit'
            } m'a chargé de vous transmettre une demande ${
            newRequest.type
          } que je n'ai pas pu enregistrer dans l'ECL.\n\n
            Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin.
            \n\n  Son Email: ${request.contexts.user.email ||
              (user && user.email ? user.email : '?')}
            \n  Son N°: ${request.contexts.user.userId || '?'}
            \n  Son message: ${newRequest.text}
            \n\nBonne journée !`,
        },
        true,
      );
      respo = 'request.recordmailonly';
    } catch (err) {
      respo = 'request.recordfail';
    }
  }
  const res: IntentResult = {
    response: await responsemanager.load(respo),
    confidence: request.confidence,
    contexts: request.contexts,
  };
  return res;
}

async function updateGlobalRequest(
  request: IntentRequest,
): Promise<IntentResult> {
  let numLocker;
  let success = false;
  let respo: string;
  const num = request.entities.filter(e => e.name === 'number');
  if (num.length > 0) numLocker = parseInt(num[0].value, 10);
  if (!request.contexts.other) request.contexts.other = {};
  request.contexts.other.numLocker = numLocker;
  if (request.contexts.user.request) {
    const requestRef = request.contexts.user.request.ref;
    const email = request.contexts.user.email;
    const user = await ecl.getUser(
      request.contexts.user.type,
      request.contexts.user.userId,
      request.contexts.site,
    );
    try {
      // Update request in ecl
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
            ${user ? `${user.prenom} ${user.nom}` : 'Un utilisateur'}
              m'a chargé de mettre à jour la demande ${requestRef}, avec un complément.\n\n
            Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin.
            \n\n  Son Email: ${email || (user && user.email ? user.email : '?')}
            \n  Son N°: ${
              user && user.telephone
                ? user.telephone
                : request.contexts.user.userId || '?'
            }
            \n  Son message: ${request.query}
            \n\nLa demande est mise à jour dans l'ECL
            \n\nBonne journée !`,
        },
        false,
      );
      success = true;
    } catch (error) {
      // Send request by mail
      await sendMessage(
        {
          from: config.MAIL.sender,
          to: request.contexts.site.email,
          subject: `[Lifee] Suite de la demande ${requestRef}`,
          text: `Salut ${
            request.contexts.site.concierges.prenomsconcierges
          }, c'est Lifee !\n\n
            ${user ? `${user.prenom} ${user.nom}` : 'Un utilisateur'}
              m'a chargé de mettre à jour la demande ${requestRef}, avec un complément.\n\n
            Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin.
            \n\n  Son Email: ${email || (user && user.email ? user.email : '?')}
            \n  Son N°: ${
              user && user.telephone
                ? user.telephone
                : request.contexts.user.userId || '?'
            }
            \n  Son message: ${request.query}
            \n\nLa demande est mise à jour dans l'ECL
            \n\nBonne journée !`,
        },
        true,
      );
    } finally {
      if (success) {
        if (numLocker) {
          respo = 'request.updatedwithlocker';
        } else {
          respo = 'request.updatednolocker';
        }
      } else {
        if (numLocker) {
          respo = 'request.updatesentwithlocker';
        } else {
          respo = 'request.updatesentnolocker';
        }
      }
    }
  } else if (request.contexts.user.email) {
    // Send request by mail
    await sendMessage(
      {
        from: config.MAIL.sender,
        to: request.contexts.site.email,
        subject: `[Lifee] Suite d'une demande à saisir`,
        text: `Salut ${
          request.contexts.site.concierges.prenomsconcierges
        }, c'est Lifee !\n\n
          Un utilisateur non inscrit m'a chargé de vous préciser sa demande.\n\n
          Ne réponds pas à ce mail (ça part dans l'espace), contacte directement l'utilisateur si besoin.
          \n\n  Son Email: ${request.contexts.user.email}
          \n  Son N°: ${request.contexts.user.userId || '?'}
          \n  Son message: ${request.query}
          \n\nBonne journée !`,
      },
      true,
    );
    respo = 'request.updatesentnolocker';
  } else {
    respo = 'default.fallback';
  }

  const res: IntentResult = {
    response: await responsemanager.load(respo),
    confidence: request.confidence,
    contexts: request.contexts,
  };
  return res;
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
      return await recordGlobalRequest(request);
    }
    request.contexts.fulfill = request.contexts.fulfill.filter(
      c => c !== config.CONTEXTS.FULFILL.requestdetails,
    );
    return await updateGlobalRequest(request);
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
    return result;
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
