import React, { Component } from 'react';
import MessageList from './MessageList';
import { TextField, FlatButton, RaisedButton } from 'material-ui';
import Divider from 'material-ui/Divider';
import styles from './Chat.css';

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
      <div className={styles.container}>
        <MessageList messages={messages} />
        <div className={styles.bottomContainer}>
          <Divider style={{marginLeft: '10px', marginRight: '10px'}}/>
          <div className={styles.inputContainer}>
            <TextField
              value={messageInputValue}
              onChange={this.handleMessageInputChange}
              hintText="Get chatting..."
            />
            <RaisedButton
              style={{marginLeft: '2px', marginTop: '-3px'}}
              primary
              label="Send"
              onTouchTap={this.internalOnSend} />
          </div>
        </div>
      </div>
    );
  }
}
