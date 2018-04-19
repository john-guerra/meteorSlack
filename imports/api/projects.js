import { Meteor } from "meteor/meteor";

Meteor.methods({
  "channels.list"() {
    const { WebClient } = require('@slack/client');

    // An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
    const token = process.env.SLACK_TOKEN;

    const web = new WebClient(token);

    // See: https://api.slack.com/methods/channels.list
    return web.channels.list();
  },
  "messages.list"(channel) {
    const { WebClient } = require('@slack/client');

    // An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
    const token = process.env.SLACK_TOKEN;

    const web = new WebClient(token);

    // See: https://api.slack.com/methods/channels.list
    return web.channels.history( {
      channel
    });
  }

})

