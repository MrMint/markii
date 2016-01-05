import * as types from '../constants';

const initialState = [
  {
    id: '0',
    particpants: [
      { name: 'User1' },
      { name: 'User2' },
      { name: 'User3' },
    ],
    messages: [
      {
        id: 'f5e659eb-e54e-4848-88bb-1b60fba923a6',
        sender: { name: 'User1' },
        text: 'FIRST TEST MESSAGE BEST MESSAGE',
        timeSent: '9:34am',
      },
      {
        id: 'c23ea386-0a0d-493e-b4c0-cec6d8b864cf',
        sender: { name: 'User2' },
        text: 'SECOND TEST MESSAGE BEST MESSAGE',
        timeSent: '9:36am',
      },
      {
        id: 'a49de746-5e1f-4e7e-87cd-9b51cac24dc3',
        sender: { name: 'User1' },
        text: 'THIRD TEST MESSAGE BEST MESSAGE',
        timeSent: '9:38am',
      },
    ],
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
