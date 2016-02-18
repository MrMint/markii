import * as types from '../constants';

export function sendMessage(message, chatId) {
  return {
    type: types.CHAT_SEND_MESSAGE,
    payload: {
      message,
      chatId,
    },
  };
}
