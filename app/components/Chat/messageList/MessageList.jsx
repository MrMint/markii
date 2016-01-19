import React, { Component } from 'react';
import MessageListItem from './messageListItem';
import style from './MessageList.css';

export default class MessageList extends Component {
  static propTypes = {
    messages: React.PropTypes.array.isRequired,
  };

  componentWillUpdate = () => {
    var node = this.refs.messageList;
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  };

  componentDidUpdate = () => {
    if (this.shouldScrollBottom) {
      var node = this.refs.messageList;
      node.scrollTop = node.scrollHeight;
    }
  };

  render() {
    const { messages } = this.props;

    return (
      <div ref="messageList" className={style.container}>
      {
        messages.map(message =>
          <MessageListItem key={message.id} message={message}/>
        )
      }
      </div>
    );
  }
}
