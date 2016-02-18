import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { default as chatsReducer } from './chat';
import * as types from '../constants';

describe('chats reducer', () => {
  it('should handle CHAT_SEND_MESSAGE', () => {
    const initialState = [{ id: '0', messages: [] }];
    const message = {
      sender: {
        name: 'testSenderName',
      },
      text: 'testText',
      timeSent: (new Date()).getTime(),
    };

    var result = chatsReducer(initialState, {
      type: types.CHAT_SEND_MESSAGE,
      payload: {
        chatId: '0',
        message,
      },
    });

    expect(result).to.deep.equal([{
      ...initialState[0],
      messages: [...initialState[0].messages, message],
    }]);
  });
});
