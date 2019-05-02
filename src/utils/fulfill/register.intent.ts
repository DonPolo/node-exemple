import { Contexts, IntentRequest, IntentResult } from '../types.util';
import responsemanager from '../responsemanager.util';
import config from '../../config';
import Ecl, { SiteGroup } from '../../models/ecl';
import { sendMessage } from '../message.util';

const ecl = new Ecl();

async function registration(c: Contexts, siteGroup: SiteGroup | null) {
  if (!c.site || !c.fulfill || !siteGroup || !c.user || !c.concierges)
    return null;
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
    // Send registration request by mail to concierge
    const nomConcierge = Ecl.getPrenomConcierge(c.concierges.concierges, false);
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
    return null;
  }
}

async function register(request: IntentRequest) {
  if (!request.contexts.fulfill) return null;
  request.contexts.fulfill = [config.CONTEXTS.FULFILL.register];
  const res: IntentResult = {
    confidence: request.confidence,
    contexts: request.contexts,
    response: await responsemanager.load('register.askmail'),
  };
  return res;
}

async function registerMail(request: IntentRequest) {
  if (!request.contexts.fulfill || !request.contexts.user) return null;
  let conf = request.confidence;
  if (
    request.contexts.fulfill &&
    request.contexts.fulfill.includes(config.CONTEXTS.FULFILL.register) &&
    request.entities.filter(e => e.name === 'builtin.email').length > 0
  ) {
    request.contexts.user.email = request.entities.filter(
      e => e.name === 'builtin.email',
    )[0].value;
    request.contexts.fulfill = [config.CONTEXTS.FULFILL.registermail];
  } else {
    conf = 0;
  }
  const res: IntentResult = {
    contexts: request.contexts,
    response: await responsemanager.load('register.askfirstname'),
    confidence: conf,
  };
  return res;
}

async function registerName(request: IntentRequest) {
  if (!request.contexts.fulfill || !request.contexts.user) return null;
  let conf = request.confidence;
  const names = request.entities.filter(e => e.name === 'name');
  let text = await responsemanager.load('default.fallback');
  let name = null;
  if (names.length > 0) {
    name = names[0].value;
  } else if (request.query.split(' ').length === 1) {
    name = request.query;
  }
  if (
    request.contexts.fulfill &&
    request.contexts.fulfill.includes(config.CONTEXTS.FULFILL.registermail) &&
    name
  ) {
    request.contexts.fulfill = [config.CONTEXTS.FULFILL.registermail];
    if (request.contexts.user.firstname) {
      request.contexts.user.lastname = name;
      if (request.contexts.site) {
        // User site group is needed
        const groups = await ecl.getSiteGroups(request.contexts.site.id);
        if (groups.length > 1) {
          request.contexts.fulfill = [config.CONTEXTS.FULFILL.registercode];
          text = await responsemanager.load('register.askcode');
        } else {
          request.contexts.fulfill = [];
          if (
            registration(request.contexts, groups.length ? groups[0] : null)
          ) {
            text = await responsemanager.load('register.done_after_validation');
          } else {
            text = await responsemanager.load('register.done');
          }
        }
      } else {
        request.contexts.fulfill = [config.CONTEXTS.FULFILL.registercode];
        text = await responsemanager.load('register.askcode');
      }
    } else {
      request.contexts.user.firstname = name;
      text = await responsemanager.load('register.asklastname');
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

async function registerCode(request: IntentRequest) {
  if (!request.contexts.fulfill || !request.contexts.user) return null;
  let conf = request.confidence;
  let txt = await responsemanager.load('default.fallback');
  if (
    request.contexts.fulfill &&
    request.contexts.fulfill.includes(config.CONTEXTS.FULFILL.registercode) &&
    request.entities.filter(e => e.name === 'builtin.number').length > 0 &&
    request.contexts.site
  ) {
    const siteGroupNumber = parseInt(
      request.entities.filter(e => e.name === 'builtin.number')[0].value,
      10,
    );
    // Check given number exists in ECL
    const groups = await ecl.getSiteGroups(request.contexts.site.id);
    const siteGroup =
      siteGroupNumber && siteGroupNumber > 0 && siteGroupNumber <= groups.length
        ? groups[siteGroupNumber - 1]
        : undefined;
    if (!siteGroup) {
      txt = await responsemanager.load('register.ask_site_group_again');
    } else {
      request.contexts.fulfill = [];
      request.contexts.user.siteGroup = siteGroupNumber;
      if (registration(request.contexts, siteGroup)) {
        txt = await responsemanager.load('register.done_after_validation');
      } else {
        txt = await responsemanager.load('register.done');
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
