import React, { Component } from 'react';
import style from './MessageListItem.css';
import { format } from 'date-fns';

export default class MessageListItem extends Component {
  static propTypes = {
    message: React.PropTypes.object.isRequired,
  };

  shouldComponentUpdate = (nextProps) => nextProps.message !== this.props.message;

  render() {
    const { message } = this.props;

    return (
      <div className={style.message}>
        <span className={style.userName}>{message.sender.name}:</span>
        <span className={style.text}>{message.text}</span>
        <span className={style.timeSent}>{format(message.timeSent, 'h:mma')}</span>
      </div>
    );
  }
}
