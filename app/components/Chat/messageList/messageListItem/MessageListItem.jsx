import React, { PropTypes } from 'react';
import style from './MessageListItem.css';
import { format } from 'date-fns';
import { pure } from 'recompose';

const MessageListItem = ({ message }) =>
  <div className={style.message}>
    <span className={style.timeSent}>{format(message.timeSent, 'h:mma')}</span>
    <span className={style.userName}>{message.sender.name}:</span>
    <span className={style.text}>{message.text}</span>
  </div>;

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired,
};

export default pure(MessageListItem);
