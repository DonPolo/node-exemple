import express from 'express';
import handlemessage, {
  handleMsgWithoutService,
} from '../utils/handlemessage.util';
import { execrequest } from '../utils/async.util';
import querystring from 'querystring';
import {
  Result,
  ResultIntent,
  ResultEntity,
  FulfillResponseResponse,
} from '../utils/types.util';
import config from '../config';

const getUserURL = 'https://slack.com/api/users.profile.get';
const postMsgURL = 'https://slack.com/api/chat.postMessage';

export default async function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (
    req.body.event &&
    req.body.event.type === 'message' &&
    !req.body.event.bot_id &&
    req.body.token === 'hvKeVxQcyXJ0DsnjGLfS617C'
  ) {
    const msg = req.body.event.text;
    const from = await getEmail(req.body.event.user);
    const to = req.body.team_id;
    const response = await handlemessage(msg, from, to, 'luis', 'slack');
    await sendSlackResponse(response, req.body.event.channel);
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(req.body.challenge);
}

export async function events(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const payload = JSON.parse(req.body.payload);
  if (payload.token === 'hvKeVxQcyXJ0DsnjGLfS617C') {
    const to = payload.team.id;
    const from = await getEmail(payload.user.id);
    const intents: ResultIntent[] = [];
    const entities: ResultEntity[] = [];
    payload.actions.forEach((a: any) => {
      intents.push({
        confidence: 0.1,
        name: a.action_id.split(' ')[0],
      });
      entities.push({
        name: a.action_id.split(' ')[1],
        value: a.selected_option.value,
      });
    });
    const result: Result = {
      intents,
      entities,
      response: {
        type: 'text',
        text: '',
      },
      query: '',
    };
    const response = await handleMsgWithoutService(
      '',
      from,
      to,
      'slack',
      result,
    );
    await sendSlackResponse(response, payload.channel.id);
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end();
}

async function getEmail(user: string) {
  const getOpt = {
    method: 'GET',
    uri: `${getUserURL}?token=${config.SLACK.apiToken}&user=${user}`,
    json: true,
  };
  const res = await execrequest(getOpt);
  if (res.body && res.body.profile && res.body.profile.email) {
    return res.body.profile.email;
  }
  return null;
}

async function sendMessage(msg: any) {
  const postOpt = {
    uri: `${postMsgURL}?${querystring.stringify(msg)}`,
    method: 'GET',
  };
  const res = await execrequest(postOpt);
  return res;
}

async function sendSlackResponse(
  responses: FulfillResponseResponse[] | null,
  channel: string,
) {
  if (responses) {
    responses.reduce(async (previous, response) => {
      await previous;
      if (response.type === 'dropdown') {
        const opt: any[] = [];
        response.params.forEach((e: any) => {
          opt.push({
            text: {
              type: 'plain_text',
              text: e.text,
              emoji: true,
            },
            value: e.value,
          });
        });
        const resu = {
          channel,
          token: config.SLACK.apiToken,
          blocks: JSON.stringify([
            {
              type: 'section',
              block_id: 'block1',
              text: {
                type: 'mrkdwn',
                text: response.text,
              },
              accessory: {
                action_id: response.value,
                type: 'static_select',
                placeholder: {
                  type: 'plain_text',
                  text: 'Sélectionnez un item',
                  emoji: true,
                },
                options: opt,
              },
            },
          ]),
        };
        await sendMessage(resu);
      } else {
        await sendMessage({
          channel,
          text: response.text,
          token: config.SLACK.apiToken,
        });
      }
    }, Promise.resolve());
  }
}
