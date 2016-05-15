import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import MessageList from './messageList';
import { TextField, } from 'material-ui';
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

  shouldComponentUpdate = (nextProps, nextState) =>
    shallowCompare(this, nextProps, nextState);

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

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      this.internalOnSend();
    }
  }

  render() {
    const { messages } = this.props;
    const { messageInputValue } = this.state;
    return (
      <div className={styles.container} onKeyDown={this.handleKeyDown}>
        <MessageList messages={messages} />
        <div className={styles.bottomContainer}>
          <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
          <div className={styles.inputContainer} onkeyDown={this.handleKeyDown}>
            <TextField
              fullWidth
              value={messageInputValue}
              onChange={this.handleMessageInputChange}
              hintText="Say something..."
            />
          </div>
        </div>
      </div>
    );
  }
}
