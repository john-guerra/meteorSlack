import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";


import SelectChannel from "./SelectChannel.js";
import Messages from "./Messages.js";


export default class App extends Component {
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
    console.log("Channel = " + c);
  }

  getMessages() {
    console.log("Requesting messages", this.state);
    if (!this.state.selChannel) return (<div>Select a channel</div>);
    Meteor.call("messages.list", this.state.selChannel, (err, res) => {
      if (err) throw err;
      console.log("Got messages" , res);
      this.setState({
        messages:res.messages
      });

    });
  }



  render() {
    this.getMessages();
    return (
      <div className="App">
        <h1>WebDev Slack</h1>
        <SelectChannel onChangeChannel={this.onChangeChannel.bind(this)}></SelectChannel>

        <Messages messages={this.state.messages}></Messages>
      </div>
    );
  }
}

App.propTypes = {

};
