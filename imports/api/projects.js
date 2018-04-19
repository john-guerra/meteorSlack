import { Meteor } from "meteor/meteor";


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('messages', function messagesPublication() {
    const { RTMClient } = require('@slack/client');

    // An access token (from your Slack app or custom integration - usually xoxb)
    const token = process.env.SLACK_TOKEN_BOT;

    // The client is initialized and then started to get an active connection to the platform
    const rtm = new RTMClient(token);
    rtm.start();

    // This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
    const conversationId = "C3W3SF5DM";

    console.log("listening");
    rtm.on("mesage", Meteor.bindEnvironment(function(m) {
      console.log(m);
    }));

    return this.ready();
  });

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
  },
  "messages.post"(channel, thread_ts) {
    const { WebClient } = require('@slack/client');
    console.log("Message post", channel, thread_ts);
    // An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
    const token = process.env.SLACK_TOKEN;

    const web = new WebClient(token);


    // See: https://api.slack.com/methods/chat.postMessage
    return web.chat.postMessage({ channel, thread_ts,  text: 'Rechazado!' });
  }

})
}




