import express from 'express';
import handlemessage from '../utils/handlemessage.util';
import { execrequest } from '../utils/async.util';
import querystring from 'querystring';
import {
  Request,
  ResultIntent,
  ResultEntity,
  ParsedResponse,
  ServiceResult,
} from '../utils/types.util';
import config from '../config';

const getUserURL = 'https://slack.com/api/users.profile.get';
const postMsgURL = 'https://slack.com/api/chat.postMessage';

/**
 * Function called when a new message is posted in Slack
 * @param req
 * @param res
 * @param next
 */
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
    const request: Request = {
      msg,
      from,
      to,
      service: 'sap',
      platform: 'slack',
      acceptedtypes: ['text', 'btn', 'dropdown', 'media', 'link'],
    };
    const response: ParsedResponse | null = await handlemessage(request);
    if (response) {
      await sendSlackResponse(response, req.body.event.channel);
    }
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(req.body.challenge);
}

/**
 * Function called when a new event is triggered in Slack (can be a button, a dropdown ...)
 * @param req
 * @param res
 * @param next
 */
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
        name: a.action_id.split('|')[1],
      });
      entities.push({
        name: a.action_id.split('|')[0],
        value: a.selected_option.value,
      });
    });
    const result: ServiceResult = {
      intents,
      entities,
      response: null,
      query: '',
      contexts: {
        fulfill: [],
        site: null,
        service: null,
        user: null,
        concierges: null,
      },
    };
    const request: Request = {
      from,
      to,
      result,
      msg: '',
      platform: 'slack',
      acceptedtypes: ['text', 'btn', 'dropdown', 'media', 'link'],
    };
    const response: ParsedResponse | null = await handlemessage(request);
    if (response) {
      await sendSlackResponse(response, payload.channel.id);
    }
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end();
}

/**
 * Get the user email by his Slack id
 * @param user the user id in Slack
 */
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

/**
 * Send a Slack message via the hook
 * @param msg the message to send (must contains block)
 */
async function sendMessage(msg: any) {
  const postOpt = {
    uri: `${postMsgURL}?${querystring.stringify(msg)}`,
    method: 'GET',
  };
  const res = await execrequest(postOpt);
  return res;
}

/**
 * Create a Slack response structure based on responses and send it
 * @param responses the responses returned by handleMessage
 * @param channel the Slack channel to Post the reponse on
 */
async function sendSlackResponse(res: ParsedResponse, channel: string) {
  const resu = {
    channel,
    token: config.SLACK.apiToken,
    blocks: '',
  };
  const blocks: any[] = [];
  await res.responses.reduce(async (previous: any, response: any) => {
    await previous;
    if (response.text) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: response.text,
        },
      });
    } else if (response.media) {
      blocks.push({
        type: 'image',
        image_url: response.media,
        alt_text: 'image',
      });
    } else if (response.btn) {
      const elements: any[] = [];
      response.btn.btns.forEach((b: any) => {
        elements.push({
          type: 'button',
          text: {
            type: 'plain_text',
            text: b.text,
          },
          value: `${b.value}|${response.btn.nextaction}`,
        });
      });
      blocks.push({
        elements,
        type: 'actions',
      });
    } else if (response.dropdown) {
      const opt: any[] = [];
      response.dropdown.opts.forEach((e: any) => {
        opt.push({
          text: {
            type: 'plain_text',
            text: e.text,
            emoji: true,
          },
          value: `${e.value}|${response.dropdown.nextaction}`,
        });
      });
      blocks.push({
        type: 'actions',
        elements: [
          {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Sélectionner une option',
              emoji: true,
            },
            options: opt,
          },
        ],
      });
    } else if (response.link) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: response.link,
        },
      });
    }
  }, Promise.resolve());
  resu.blocks = JSON.stringify(blocks);
  await sendMessage(resu);
}
