import React, { Component } from 'react';
import MessageList from './MessageList';
import { TextField, FlatButton } from 'material-ui';
import style from './Chat.css';

export default class Chat extends Component {
  static propTypes = {
    messages: React.PropTypes.array.isRequired,
    onSend: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      messageInputValue: '',
    };
  }

  internalOnSend = () => {
    const { onSend } = this.props;
    const { messageInputValue } = this.state;
    onSend(messageInputValue);
    this.setState({ messageInputValue: '' });
  };

  handleMessageInputChange = (event) => {
    this.setState({
      messageInputValue: event.target.value,
    });
  }

  render() {
    const { messages } = this.props;
    const { messageInputValue } = this.state;
    return (
      <div className={style.container}>
        <MessageList messages={messages} />
        <TextField
          value={messageInputValue}
          onChange={this.handleMessageInputChange}
        />
        <FlatButton label="Send" onTouchTap={this.internalOnSend} />
      </div>
    );
  }
}
