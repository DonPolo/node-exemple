import {
  Contexts,
  IntentRequest,
  IntentResult,
  Response,
} from '../../../types/types.util';
import config from '../../config';
import Ecl, { SiteGroup, User } from '../../models/ecl';
import { sendMessage } from '../message.util';
import logger from '../../config/logger';

const ecl = new Ecl();

async function registration(c: Contexts, siteGroup: SiteGroup | null) {
  if (!c.site || !c.fulfill || !siteGroup || !c.user || !c.site.concierges)
    return false;
  try {
    // Store registration request in database
    const token = await ecl.saveRegistration(
      c.site,
      c.user.userId || '?',
      c.user.email,
      c.user.lastname,
      c.user.firstname,
      siteGroup,
    );
    const link = `${config.ECL.url}/inscription/verif_email.php?tok=${token}`;
    await sendMessage({
      from: c.site.email,
      to: c.user.email,
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
        ` <p>Bonjour ${c.user.firstname},</p><br />` +
        ' <p>Nous avons bien pris en compte votre inscription à la conciergerie. ' +
        'Afin de vérifier votre adresse mail, merci de cliquer sur le lien suivant:</p>' +
        ` <a href="${link}">Vérifier mon adresse mail</a>` +
        ' <p>Une fois votre adresse vérifiée, votre compte sera actif dans les deux jours ouvrables suivant votre inscription.</p><br>' +
        ' <p>À très bientôt à la conciergerie !</p>' +
        ' <p>Au plaisir de vous rendre service.</p>' +
        '</body>' +
        '</html>',
    });

    return true;
  } catch (err) {
    logger.error(err);
    // Send registration request by mail to concierge
    const nomConcierge = c.site.concierges.prenomsconcierges;
    await sendMessage(
      {
        from: config.MAIL.sender,
        to: c.site.email,
        subject: `[Lifee] Nouvelle inscription à saisir`,
        text: `Salut ${nomConcierge}, c'est Lifee !\n\nL'utilisateur suivant souhaite s'inscrire:\n\n  Son nom: ${
          c.user.lastname
        }\n  Son Prénom: ${c.user.firstname}\n  Son Email: ${
          c.user.lastname
        }\n  Son N°: ${c.user.userId || '?'}\n  Sa conciergerie: ${c.site
          .libelle || '?'}\n  Son code de regroupement: ${
          siteGroup ? siteGroup.nom : '?'
        }\n\nMerci de procéder à son inscription.\n\nBonne journée !`,
      },
      true,
    );
    return false;
  }
}

function checkAlreadyRegistered(request: IntentRequest): boolean {
  return request.contexts.user.registered;
}

async function checkUserByMail(request: IntentRequest) {
  const mail: string = request.entities.filter(
    e => e.name === 'email' || e.name === '##all##',
  )[0].value;
  const user: User | null = await ecl.getUser(
    'email',
    mail,
    request.contexts.site,
  );
  if (user) {
    request.contexts.user = {
      gender: 0,
      lastname: user.nom,
      firstname: user.prenom,
      email: user.email,
      siteGroup: parseInt(user.group, 10),
      userId: request.contexts.user.userId,
      registered: true,
      type: request.contexts.user.type,
      request: null,
    };
  }
  return user;
}

async function register(request: IntentRequest): Promise<IntentResult> {
  let txt: string;
  let confidence = request.confidence;
  if (!checkAlreadyRegistered(request)) {
    if (
      !request.contexts.fulfill.includes(config.CONTEXTS.FULFILL.register) &&
      !request.contexts.fulfill.includes(
        config.CONTEXTS.FULFILL.registercode,
      ) &&
      !request.contexts.fulfill.includes(config.CONTEXTS.FULFILL.registermail)
    ) {
      if (
        request.entities.filter(e => e.name === 'email' || e.name === '##all##')
          .length > 0
      ) {
        // Mail given skip this part
        const user = await checkUserByMail(request);
        if (user) {
          // User already exists
          request.contexts.fulfill = [];
          txt = 'register.already';
        } else {
          // Ask his name
          request.contexts.user.email = request.entities.filter(
            e => e.name === 'email',
          )[0].value;
          request.contexts.fulfill = [config.CONTEXTS.FULFILL.registermail];
          txt = 'register.askfirstname';
        }
      } else {
        // Normal registration
        request.contexts.fulfill = [config.CONTEXTS.FULFILL.register];
        txt = 'register.askmail';
      }
    } else {
      confidence = 0.2;
      txt = 'register.registering';
    }
  } else {
    txt = 'register.already';
  }
  const res: IntentResult = {
    confidence,
    contexts: request.contexts,
    response: txt,
  };
  return res;
}

async function registerMail(request: IntentRequest): Promise<IntentResult> {
  let conf = request.confidence;
  let txt: string;
  if (
    request.contexts.fulfill.includes(config.CONTEXTS.FULFILL.register) &&
    request.entities.filter(e => e.name === 'email' || e.name === '##all##')
      .length > 0 &&
    !checkAlreadyRegistered(request)
  ) {
    const user = await checkUserByMail(request);
    if (user) {
      request.contexts.fulfill = [];
      txt = 'register.already';
    } else {
      request.contexts.user.email = request.entities.filter(
        e => e.name === 'email',
      )[0].value;
      request.contexts.fulfill = [config.CONTEXTS.FULFILL.registermail];
      txt = 'register.askfirstname';
    }
  } else {
    conf = 0;
    txt = 'register.askfirstname';
  }
  const res: IntentResult = {
    contexts: request.contexts,
    response: txt,
    confidence: conf,
  };
  return res;
}

async function registerName(request: IntentRequest): Promise<IntentResult> {
  let conf = request.confidence;
  const names = request.entities.filter(
    e => e.name === 'name' || e.name === '##all##',
  );
  let text = 'default.fallback';
  let name = null;
  if (names.length > 0) {
    name = names[0].value;
  } else if (request.query.split(' ').length === 1) {
    name = request.query;
  }
  if (
    request.contexts.fulfill &&
    request.contexts.fulfill.includes(config.CONTEXTS.FULFILL.registermail) &&
    name &&
    !checkAlreadyRegistered(request)
  ) {
    request.contexts.fulfill = [config.CONTEXTS.FULFILL.registermail];
    if (request.contexts.user.firstname) {
      request.contexts.user.lastname = name;
      if (request.contexts.site) {
        // User site group is needed
        const groups = await ecl.getSiteGroups(request.contexts.site.id);
        if (groups.length > 1) {
          request.contexts.fulfill = [config.CONTEXTS.FULFILL.registercode];
          text = 'register.askcode';
        } else {
          request.contexts.fulfill = [];
          request.contexts.user.registered = true;
          if (
            registration(request.contexts, groups.length ? groups[0] : null)
          ) {
            text = 'register.done_after_validation';
          } else {
            text = 'register.done';
          }
        }
      } else {
        request.contexts.fulfill = [config.CONTEXTS.FULFILL.registercode];
        text = 'register.askcode';
      }
    } else {
      request.contexts.user.firstname = name;
      text = 'register.asklastname';
    }
    conf = 0.9;
  } else {
    conf = 0;
  }
  const res: IntentResult = {
    response: text,
    contexts: request.contexts,
    confidence: conf,
  };
  return res;
}

async function registerCode(request: IntentRequest): Promise<IntentResult> {
  let conf = request.confidence;
  let txt = 'default.fallback';
  if (
    request.contexts.fulfill.includes(config.CONTEXTS.FULFILL.registercode) &&
    request.entities.filter(e => e.name === 'number' || e.name === '##all##')
      .length > 0 &&
    request.contexts.site &&
    !checkAlreadyRegistered(request)
  ) {
    const siteGroupNumber = parseInt(
      request.entities.filter(
        e => e.name === 'number' || e.name === '##all##',
      )[0].value,
      10,
    );
    // Check given number exists in ECL
    const groups = await ecl.getSiteGroups(request.contexts.site.id);
    const siteGroup =
      siteGroupNumber && siteGroupNumber > 0 && siteGroupNumber <= groups.length
        ? groups[siteGroupNumber - 1]
        : undefined;
    if (!siteGroup) {
      txt = 'register.ask_site_group_again';
    } else {
      request.contexts.fulfill = [];
      request.contexts.user.siteGroup = siteGroupNumber;
      request.contexts.user.registered = true;
      if (registration(request.contexts, siteGroup)) {
        txt = 'register.done_after_validation';
      } else {
        txt = 'register.done';
      }
    }
    conf = 0.9;
  } else {
    conf = 0;
  }
  const res: IntentResult = {
    contexts: request.contexts,
    response: txt,
    confidence: conf,
  };
  return res;
}

export default {
  register,
  registerMail,
  registerName,
  registerCode,
};
