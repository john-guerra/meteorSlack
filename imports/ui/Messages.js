import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderMessages() {
    return this.props.messages.map((m, i) =>
      <div key={i}>
        <div>{m.user}</div>
        <div>{m.text}</div>
        <button>Approve!</button>
        <hr/>
      </div>
    );
  }


  render() {
    return (
      <div className="Messages">
        {this.renderMessages()}
      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};
