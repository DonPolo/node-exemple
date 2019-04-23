import { Contexts, ResultEntity, FulfillResponse } from '../types.util';
import responsemanager from '../responsemanager.util';
import config from '../../config';
import Ecl, { SiteGroup } from '../../models/ecl';
import { sendMessage } from '../message.util';

const ecl = new Ecl();

async function registration(c: Contexts, siteGroup: SiteGroup | null) {
  if (!c.site || !c.fulfill || !siteGroup) return null;
  try {
    // Store registration request in database
    const token = await ecl.saveRegistration(
      c.site.site,
      c.fulfill.userId || '?',
      c.fulfill.email,
      c.fulfill.lastname,
      c.fulfill.firstname,
      siteGroup,
    );
    const link = `${config.ECL.url}/inscription/verif_email.php?tok=${token}`;
    await sendMessage({
      from: c.site.site.email,
      to: c.fulfill.email,
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
        ` <p>Bonjour ${c.fulfill.firstname},</p><br />` +
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
    const nomConcierge = Ecl.getPrenomConcierge(c.site.concierges, false);
    await sendMessage(
      {
        from: config.MAIL.sender,
        to: c.site.site.email,
        subject: `[Lifee] Nouvelle inscription à saisir`,
        text: `Salut ${nomConcierge}, c'est Lifee !\n\nL'utilisateur suivant souhaite s'inscrire:\n\n  Son nom: ${
          c.fulfill.lastname
        }\n  Son Prénom: ${c.fulfill.firstname}\n  Son Email: ${
          c.fulfill.lastname
        }\n  Son N°: ${c.fulfill.userId || '?'}\n  Sa conciergerie: ${c.site
          .site.libelle || '?'}\n  Son code de regroupement: ${
          siteGroup ? siteGroup.nom : '?'
        }\n\nMerci de procéder à son inscription.\n\nBonne journée !`,
      },
      true,
    );
    return null;
  }
}

async function register(
  entities: ResultEntity[],
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  if (!c.fulfill) return null;
  c.fulfill.ctx = [config.CONTEXTS.FULFILL.register];
  const res: FulfillResponse = {
    confidence,
    contexts: c,
    response: await responsemanager.load('intent.register.askmail'),
  };
  return res;
}

async function registerMail(
  entities: ResultEntity[],
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  if (!c.fulfill) return null;
  let conf = confidence;
  if (
    c.fulfill.ctx &&
    c.fulfill.ctx.includes(config.CONTEXTS.FULFILL.register) &&
    entities.filter(e => e.name === 'builtin.email').length > 0
  ) {
    c.fulfill.email = entities.filter(e => e.name === 'builtin.email')[0].value;
    c.fulfill.ctx = [config.CONTEXTS.FULFILL.registermail];
  } else {
    conf = 0;
  }
  const res: FulfillResponse = {
    contexts: c,
    response: await responsemanager.load('intent.register.askfirstname'),
    confidence: conf,
  };
  return res;
}

async function registerName(
  entities: ResultEntity[],
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  if (!c.fulfill) return null;
  let conf = confidence;
  const names = entities.filter(e => e.name === 'name');
  let text = '';
  let params = null;
  let name = null;
  if (names.length > 0) {
    name = names[0].value;
  } else if (query.split(' ').length === 1) {
    name = query;
  }
  if (
    c.fulfill.ctx &&
    c.fulfill.ctx.includes(config.CONTEXTS.FULFILL.registermail) &&
    name
  ) {
    c.fulfill.ctx = [config.CONTEXTS.FULFILL.registermail];
    if (c.fulfill.firstname) {
      c.fulfill.lastname = name;
      if (c.site) {
        // User site group is needed
        const groups = await ecl.getSiteGroups(c.site.site.id);
        if (groups.length > 1) {
          c.fulfill.ctx = [config.CONTEXTS.FULFILL.registercode];
          text = await responsemanager.load('intent.register.askcode');
          params = {
            firstname: c.fulfill.firstname,
          };
        } else {
          c.fulfill.ctx = [];
          if (registration(c, groups.length ? groups[0] : null)) {
            text = await responsemanager.load(
              'intent.register.done_after_validation',
            );
            params = {
              count: c.site.concierges.length,
              conciergeGivenName: Ecl.getPrenomConcierge(c.site.concierges),
            };
          } else {
            text = await responsemanager.load('intent.register.done');
          }
        }
      } else {
        c.fulfill.ctx = [config.CONTEXTS.FULFILL.registercode];
        text = await responsemanager.load('intent.register.askcode');
        params = {
          firstname: c.fulfill.firstname,
        };
      }
    } else {
      c.fulfill.firstname = name;
      text = await responsemanager.load('intent.register.asklastname');
      params = {
        firstname: c.fulfill.firstname,
      };
    }
    conf = 0.9;
  } else {
    conf = 0;
  }
  const res: FulfillResponse = {
    params,
    response: text,
    contexts: c,
    confidence: conf,
  };
  return res;
}

async function registerCode(
  entities: ResultEntity[],
  c: Contexts,
  confidence: number,
  query: string,
  types: string[],
) {
  if (!c.fulfill) return null;
  let conf = confidence;
  let txt = '';
  let params = null;
  if (
    c.fulfill.ctx &&
    c.fulfill.ctx.includes(config.CONTEXTS.FULFILL.registercode) &&
    entities.filter(e => e.name === 'builtin.number').length > 0 &&
    c.site
  ) {
    const siteGroupNumber = parseInt(
      entities.filter(e => e.name === 'builtin.number')[0].value,
      10,
    );
    // Check given number exists in ECL
    const groups = await ecl.getSiteGroups(c.site.site.id);
    const siteGroup =
      siteGroupNumber && siteGroupNumber > 0 && siteGroupNumber <= groups.length
        ? groups[siteGroupNumber - 1]
        : undefined;
    if (!siteGroup) {
      txt = await responsemanager.load('intent.register.ask_site_group_again');
      params = {
        max: groups.length,
      };
    } else {
      c.fulfill.ctx = [];
      c.fulfill.siteGroup = siteGroupNumber;
      if (registration(c, siteGroup)) {
        txt = await responsemanager.load(
          'intent.register.done_after_validation',
        );
        params = {
          count: c.site.concierges.length,
          conciergeGivenName: Ecl.getPrenomConcierge(c.site.concierges),
        };
      } else {
        txt = await responsemanager.load('intent.register.done');
      }
    }
    conf = 0.9;
  } else {
    conf = 0;
  }
  const res: FulfillResponse = {
    params,
    contexts: c,
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
