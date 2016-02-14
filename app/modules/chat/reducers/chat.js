import * as types from '../constants';

const initialState = [
  {
    id: '0',
    particpants: [],
    messages: [],
  },
  {
    id: '1',
    particpants: [],
    messages: [],
  },
  {
    id: '2',
    particpants: [],
    messages: [],
  },
  {
    id: '3',
    particpants: [],
    messages: [],
  },
];

export default function chats(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_SEND_MESSAGE:
      return state.map(chat =>
        chat.id === action.payload.roomId
        ? { ...chat, messages: [...chat.messages, action.payload.message] }
        : chat);
    default:
      return state;
  }
}
