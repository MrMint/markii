import React, { Component } from 'react';
import MessageList from './MessageList';
import { TextField, FlatButton } from 'material-ui';
import style from './Chat.css';

export default class Chat extends Component {
  static propTypes = {
    messages: React.PropTypes.array.isRequired,
    onSend: React.PropTypes.func.isRequired,
    sender: React.PropTypes.object.isRequired,
  };

  internalOnSend = (onSend) => {
    onSend(this.refs.messageInput.getValue());
  };

  render() {
    const { messages, onSend } = this.props;
    return (
      <div className={style.container}>
        <MessageList messages={messages} />
        <TextField ref="messageInput"/>
        <FlatButton label="Send" onTouchTap={this.internalOnSend.bind(this, onSend)}/>
      </div>
    );
  }
}
