import React, { Component } from 'react';
import MessageListItem from './messageListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import { pure } from 'recompose';
import style from './MessageList.css';

class MessageList extends Component {
  static propTypes = {
    messages: React.PropTypes.array.isRequired,
  };

  componentWillUpdate = () => {
    this.shouldScrollBottom =
      this.node.getScrollTop() + this.node.getValues().clientHeight
      === this.node.getValues().scrollHeight;
  };

  componentDidUpdate = () => {
    if (this.shouldScrollBottom) {
      this.node.scrollToBottom();
    }
  };

  render() {
    const { messages } = this.props;

    return (
      <Scrollbars ref={c => { this.node = c; }} className={style.container}>
      {
        messages.map(message =>
          <MessageListItem key={message.id} message={message} />
        )
      }
      </Scrollbars>
    );
  }
}

export default pure(MessageList);
