import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor} from "meteor/meteor";

export default class SelectChannel extends Component {
  constructor(props) {
    super(props);

    this.state={
      channels:[]
    };
  }

  componentDidMount() {
    Meteor.call("channels.list", (err, res) =>  {
      if (err) throw err;
      this.setState({channels: res.channels});
      console.log(res);
    });
  }

  renderChannels() {
    return this.state.channels.map( (c) => {
      return (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>);
    });
  }


  render() {
    return (
      <div className="SelectChannel">
        <select onChange={(evt) => {
          this.props.onChangeChannel(evt.target.value)}
        } name="channel" id="selectChannel">
         {this.renderChannels()}
        </select>
      </div>
    );
  }
}

SelectChannel.propTypes = {
  onChangeChannel: PropTypes.func.isRequired
};
















