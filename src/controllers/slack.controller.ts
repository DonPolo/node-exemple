import express from 'express';
import handlemessage from '../utils/handlemessage.util';
import { WebClient } from '@slack/web-api';

import config from '../config';

export default async function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  console.log('New request');
  if (
    req.body.event &&
    req.body.event.type === 'message' &&
    !req.body.event.bot_id
  ) {
    const msg = req.body.event.text;
    const from = req.body.event.user;
    const to = req.body.event.channel;
    const response = await handlemessage(msg, from, to, 'luis', 'slack');
    if (response) {
      const res = {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: response.text,
        },
        accessory: {},
      };
      if (response.type === 'dropdown') {
        res.accessory = {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Sélectionnez un item',
            emoji: true,
          },
          options: [],
        };
        response.params.forEach((e: any) => {
          res.accessory.options.push({
            text: {
              type: 'plain_text',
              text: e.text,
              emoji: true,
            },
            value: e.value,
          });
        });
      }
      const web = new WebClient(config.SLACK.apiToken);
      await web.chat.postMessage({
        text: response,
        channel: req.body.event.channel,
      } as any);
    }
  }
  console.log(req.body);
  res.writeHead(200, { 'Content-Type': 'text/plain' });