import React, { PureComponent } from 'react';
import style from './MessageListItem.css';
import { format } from 'date-fns';

export default class MessageListItem extends PureComponent {
  static propTypes = {
    message: React.PropTypes.object.isRequired,
  };

  render() {
    const { message } = this.props;

    return (
      <div className={style.message}>
        <span className={style.timeSent}>{format(message.timeSent, 'h:mma')}</span>
        <span className={style.userName}>{message.sender.name}:</span>
        <span className={style.text}>{message.text}</span>
      </div>
    );
  }
}
