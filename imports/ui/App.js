import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';


import SelectChannel from "./SelectChannel.js";
import Messages from "./Messages.js";

import "../api/projects.js";


export class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      selChannel:null,
      messages:[]
    };
  }

  onChangeChannel(c) {
    this.setState( {
      selChannel: c
    });
    this.getMessages(c);
    console.log("Channel = " + c);
  }

  onApprove(thread_ts) {
    console.log("Approve message", thread_ts, this.state);
    Meteor.call("messages.post",
      this.state.selChannel,
      thread_ts,
      (err) => {
      if (err) throw err;
      console.log("Message approved!");
    });

  }

  getMessages(channel) {
    console.log("Requesting messages", this.state, channel);
    channel = channel || this.state.selChannel;
    if (!channel) return;
    Meteor.call("messages.list", channel, (err, res) => {
      if (err) throw err;
      console.log("Got messages" , res);
      this.setState({
        messages:res.messages.filter((m) => !m.thread_ts)
      });

    });
  }



  render() {
    return (
      <div className="App">
        <h1>WebDev Slack</h1>
        <SelectChannel onChangeChannel={this.onChangeChannel.bind(this)}></SelectChannel>

        <Messages onApprove={this.onApprove.bind(this)}messages={this.state.messages}></Messages>
      </div>
    );
  }
}

App.propTypes = {

};


export default withTracker(() => {
  Meteor.subscribe("messages");
  return {
    // messages: Tasks.find({}).fetch(),
  };
})(App);
