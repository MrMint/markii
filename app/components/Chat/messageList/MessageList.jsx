import React, { PureComponent } from 'react';
import MessageListItem from './messageListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import style from './MessageList.css';

export default class MessageList extends PureComponent {
  static propTypes = {
    messages: React.PropTypes.array.isRequired,
  };

  componentWillUpdate = () => {
    var node = this.refs.messageList;
    this.shouldScrollBottom =
      node.getScrollTop() + node.getValues().clientHeight === node.getValues().scrollHeight;
  };

  componentDidUpdate = () => {
    if (this.shouldScrollBottom) {
      var node = this.refs.messageList;
      node.scrollToBottom();
    }
  };

  render() {
    const { messages } = this.props;

    return (
      <Scrollbars ref="messageList" className={style.container}>
      {
        messages.map(message =>
          <MessageListItem key={message.id} message={message} />
        )
      }
      </Scrollbars>
    );
  }
}
