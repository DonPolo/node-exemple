// @flow

/**
 * Twilio Controller
 */

import HTTPStatus from 'http-status';
import uuid from 'node-uuid';
import Dialogflow from 'dialogflow';
import twilio from 'twilio';
import Queue from 'better-queue';

import config from '../config/constants';
import { logger } from '../config/winston';
import db from '../models';
import Ecl from '../models/ecl';
import protobuf from '../services/protobuf';
import APIError from '../services/error';
// import EngieFix from '../../db/engie-fix';

const { MessagingResponse } = twilio.twiml;
const dialogflow = Dialogflow.v2beta1;
const ecl = new Ecl();

const messages = {
  welcome: (site, concierges) =>
    `Bonjour, je suis Lifee, l'assistant virtuel Easylife de ${Ecl.getPrenomConcierge(
      concierges
    )}, votre concierge.\n` +
    'Nous inaugurons une nouvelle formule : je pourrai prendre vos demandes 7j/7 et 24h/24 ' +
    `et les transmettrai à ${Ecl.getPrenomConcierge(
      concierges
    )}. Enregistrez bien mon numéro (non surtaxé) pour pouvoir faire vos demandes : ` +
    `${
      site.botNumber
    }\n\nUn évènement convivial sera organisé très prochainement pour ` +
    'vous expliquer en détail le fonctionnement de cette nouvelle formule ! A très vite.',
  start:
    "L'escape game digital de la conciergerie, c'est parti !!\n" +
    'Vous allez recevoir 4 questions dans la matinée. ' +
    'Répondez en live, rapprochez-vous de vos collègues pour mutualiser vos chances de gagner !\n' +
    'Si besoin, votre concierge a probablement des indices !\n' +
    'A partir de 11h30, quand vous aurez les 4 mots et chiffres mystères, ' +
    'venez à la conciergerie pour reconstituer la phrase magique et ouvrir un casier pour tenter de gagner des chèques cadeau !',
  question: [
    'Quel est le synonyme de « neuve » ?',
    'Quel est le concept qui vous facilite la vie au quotidien ?',
    'Qui a le plus beau sourire du site ?',
    'Qui suis-je ?'
  ],
  end: 'Venez tenter votre chance près des casiers dès maintenant !'
};

// const timeoutPromise = timeout =>
//   new Promise(resolve => setTimeout(resolve, timeout));

type EngieUser = {
  tel: string,
  lifee: string,
  offset: number,
  sent: number[],
  messages: { [string]: boolean }
};

type EngieTask = {
  msg: string,
  num?: number,
  lifee?: string
};

const engieQueue = new Queue(async (task: EngieTask, cb) => {
  const { msg, num, lifee } = task;
  try {
    logger.info('Queue task started', { task });
    const client = twilio(config.TWILIO.accountId, config.TWILIO.authToken);
    const msgName = num ? `${msg}${num}` : msg;
    const users: EngieUser[] = await db.find(db.model.Engie, {
      'messages.welcome': true,
      [`messages.${msgName}`]: { $ne: true },
      lifee: lifee && lifee.length ? { $in: lifee } : { $exists: true }
    });

    logger.info(`Queue task found ${users.length} user(s)`);
    const sites = {};
    await users.reduce(async (previous, user) => {
      const newNum = num
        ? (user.offset + num - 1) % messages.question.length
        : undefined;
      await previous;
      const prefix = num === 1 ? 'Voici la 1ère question :\n' : '';
      let message;
      if (msg === 'welcome') {
        let site;
        let concierges;
        if (!sites[user.lifee]) {
          site = await ecl.getSiteInfos('twilio', user.lifee);
          if (!site)
            throw Error(`Unable to get 'site infos' for ${user.lifee}`);
          concierges = await ecl.getConciergeList(site.code);
          if (!site)
            throw Error(`Unable to get 'concierges' list for ${site.code}`);
          sites[user.lifee] = {
            site,
            concierges
          };
        } else {
          ({ site, concierges } = sites[user.lifee]);
        }
        message = messages[msg](site, concierges);
      } else if (num) message = `${prefix}${messages[msg][newNum]}`;
      else message = messages[msg];
      try {
        await client.messages.create({
          body: message,
          from: user.lifee,
          to: user.tel
        });
        // await timeoutPromise(50);
        // logger.info('SMS sent:', {
        //   body: message,
        //   from: user.lifee,
        //   to: user.tel
        // });
        if (num && !user.sent.includes(newNum + 1))
          await db.update(
            db.model.Engie,
            user,
            {
              $push: { sent: newNum + 1 },
              $set: { [`messages.${msgName}`]: true }
            },
            {}
          );
        else
          await db.update(
            db.model.Engie,
            user,
            { $set: { [`messages.${msgName}`]: true } },
            {}
          );
      } catch (error) {
        logger.error('Twilio error', error);
      }
    }, Promise.resolve());
    logger.info('Queue task ended', { task });
    cb();
  } catch (err) {
    logger.error('Queue task error', { task, err });
    cb(err);
  }
});

export async function webhook(
  req: $Subtype<express$Request>,
  res: express$Response,
  next: express$NextFunction
) {
  try {
    if (req.body.From && req.body.Body) {
      const tel: string = req.body.From;
      const query: string = req.body.Body;

      const contexts = [];

      if ((await db.count(db.model.Dialogflow, { tel })) === 0) {
        await db.insert(db.model.Dialogflow, { tel, uuid: uuid.v4() });
      }
      let session = await db.findOne(db.model.Dialogflow, { tel });
      if (!session) session = { tel, uuid: uuid.v4() };
      const sessionId = session.uuid;
      // Instantiates a session client
      const sessionClient = new dialogflow.SessionsClient();
      // The path to identify the agent that owns the created intent.
      const sessionPath = sessionClient.environmentSessionPath(
        config.DIALOG_FLOW.projectId,
        config.DIALOG_FLOW.environment,
        '-',
        sessionId
      );

      // Instantiates a context client
      const contextsClient = new dialogflow.ContextsClient();

      // For ENGIE game
      if ((await db.count(db.model.Engie, { tel })) >= 0) {
        const user: ?EngieUser = await db.findOne(db.model.Engie, { tel });
        if (user && user.sent.length) {
          // Add a context per sent questions to allow only answering to questions already received
          user.sent.forEach(num => {
            contexts.push({
              name: contextsClient.contextPath(
                config.DIALOG_FLOW.projectId,
                sessionId,
                `EscapeGameENGIE-${num}`
              ),
              lifespanCount: 1
            });
          });
          // Add a global context for the game
          contexts.push({
            name: contextsClient.contextPath(
              config.DIALOG_FLOW.projectId,
              session.uuid,
              'EscapeGameENGIE'
            ),
            lifespanCount: 1
          });
        }
      }
      // The text query request with contexts
      const request = {
        session: sessionPath,
        queryParams: {
          contexts,
          payload: protobuf.jsonToStructProto({
            data: {
              From: req.body.From,
              To: req.body.To,
              Body: req.body.Body
            },
            source: 'twilio'
          })
        },
        queryInput: {
          text: {
            text: query,
            languageCode: config.DIALOG_FLOW.languageCode
          }
        }
      };
      const result = await sessionClient.detectIntent(request);
      if (
        result[0].queryResult.fulfillmentText &&
        result[0].queryResult.fulfillmentText.length
      ) {
        // Answer with Twilio
        const twiml = new MessagingResponse();
        twiml.message(result[0].queryResult.fulfillmentText);
        res.writeHead(HTTPStatus.OK, { 'Content-Type': 'text/xml' });
        return res.end(twiml.toString());
      }
      return res.sendStatus(HTTPStatus.OK);
    }
    return next(
      new APIError(
        "Missing 'From' or 'Body' param in body",
        HTTPStatus.BAD_REQUEST,
        true
      )
    );
  } catch (err) {
    err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(err);
  }
}

export async function engieGame(
  req: $Subtype<express$Request>,
  res: express$Response,
  next: express$NextFunction
) {
  try {
    if (req.body.msg && Object.keys(messages).includes(req.body.msg)) {
      const { msg } = req.body;
      let num;
      if (msg === 'question') {
        num = parseInt(req.body.num, 10);
        if (!num || Number.isNaN(num) || num > messages.question.length) {
          return next(
            new APIError(
              "Missing or bad 'num' parameter",
              HTTPStatus.BAD_REQUEST,
              true
            )
          );
        }
      }

      engieQueue.push({
        msg,
        num,
        lifee: req.body.lifee
      });

      return res.sendStatus(HTTPStatus.CREATED);
    }
    return next(
      new APIError(
        "Missing or bad 'msg' parameter",
        HTTPStatus.BAD_REQUEST,
        true
      )
    );
  } catch (err) {
    err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(err);
  }
}

// export async function engieFix(
//   req: $Subtype<express$Request>,
//   res: express$Response,
//   next: express$NextFunction
// ) {
//   try {
//     await db.update(
//       db.model.Engie,
//       { messages: { $exists: true } },
//       { $set: { 'messages.welcome': false } },
//       { multi: true }
//     );
//     EngieFix.reduce(async (previous, tel) => {
//       await previous;
//       await db.update(
//         db.model.Engie,
//         { tel },
//         { $set: { 'messages.welcome': true } },
//         {}
//       );
//     }, Promise.resolve());
//     return res.sendStatus(HTTPStatus.OK);
//   } catch (err) {
//     err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
//     return next(err);
//   }
// }

export async function engieStop(
  req: $Subtype<express$Request>,
  res: express$Response,
  next: express$NextFunction
) {
  if (!req.body.sessionId)
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .end("Missing 'sessionId' parameter");
  const { sessionId } = req.body;
  try {
    const user = await db.findOne(db.model.Dialogflow, { uuid: sessionId });
    if (!user)
      return res.status(HTTPStatus.BAD_REQUEST).end("Unknown 'sessionId'");
    await db.update(
      db.model.Engie,
      { tel: user.tel },
      { $set: { 'messages.welcome': false } },
      { multi: false }
    );
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(err);
  }
}

export async function engieEnd(
  req: $Subtype<express$Request>,
  res: express$Response,
  next: express$NextFunction
) {
  if (!req.body.lifee)
    return res.status(HTTPStatus.BAD_REQUEST).end("Missing 'lifee' parameter");
  const { lifee } = req.body;
  try {
    await db.update(
      db.model.Engie,
      { lifee },
      { $set: { sent: [] } },
      { multi: true }
    );
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(err);
  }
}

export async function engieSync(
  req: $Subtype<express$Request>,
  res: express$Response,
  next: express$NextFunction
) {
  try {
    let offset = 1;
    const sites = [
      'GDF Villeurbanne',
      'GDFSUEZ Quimper',
      'GDFSUEZ Montpellier',
      'GDFSUEZ Metz',
      'GDFSUEZ Toulouse',
      'GDFSUEZ Bagneux',
      'GDFSUEZ Douai',
      'GDFSUEZ Annecy',
      'GDFSUEZ La Baule',
      '5902_GDFSUEZ DUNKERQ',
      '4501_GDFSUEZ ORLEANS',
      '9501_GDFSUEZCERGY'
    ];
    const users = await ecl.getSiteUsers(sites);
    // const users = [
    //   {
    //     /* Flavien */
    //     tel: '+33621543841',
    //     twilio: '+33755536910'
    //   },
    //   {
    //     /* Camille */
    //     tel: '+33625280799',
    //     twilio: '+33755536910'
    //   },
    //   {
    //     /* Xavier */
    //     tel: '+33623611910',
    //     twilio: '+33755536910'
    //   },
    //   {
    //     /* Josselin */
    //     tel: '+33779465794',
    //     twilio: '+33755536910'
    //   },
    //   {
    //     /* Simon */
    //     tel: '+33609031079',
    //     twilio: '+33755536910'
    //   }
    // ];
    await users.reduce(async (previous, newUser) => {
      await previous;
      const { tel: unformatedTel, twilio: lifee } = newUser;
      const tel = unformatedTel.replace(/[^+\d]/g, '').replace(/^0/, '+33');
      logger.debug('User', {
        unformatedTel,
        lifee,
        tel
      });
      const user: ?EngieUser = await db.findOne(db.model.Engie, { tel });
      if (!user) {
        // Insert new user
        await db.insert(
          db.model.Engie,
          ({
            tel,
            lifee,
            offset,
            sent: [],
            messages: { welcome: true }
          }: EngieUser)
        );
        // Shift question offset index for each new user
        offset = (offset % messages.question.length) + 1;
      } else if (user.lifee !== lifee) {
        // Update lifee number
        await db.update(db.model.Engie, { tel }, { $set: { lifee } }, {});
      }
    }, Promise.resolve());

    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(err);
  }
}
