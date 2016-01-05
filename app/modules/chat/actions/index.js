import * as types from '../constants';

export function sendMessage(message, roomId) {
  return {
    type: types.CHAT_SEND_MESSAGE,
    payload: {
      message,
      roomId,
    },
  };
}
