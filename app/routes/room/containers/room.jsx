import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import MediaPlayer from '../../../components/mediaPlayer';
import Chat from '../../../components/chat';
import * as chatActions from '../../../modules/chat/actions';
import * as MediaSources from '../../../components/mediaPlayer/constants';

import { } from 'material-ui';

class Room extends Component {
  static propTypes = {
    room: React.PropTypes.object.isRequired,
    chat: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  }

  onChatSendMessage = (text) => {
    const message = {
      id: uuid.v4(),
      sender: {
        name: 'test',
      },
      text,
      timeSent: '2:53pm',
    };
    this.props.dispatch(chatActions.sendMessage(message, '0'));
  }

  render() {
    const { chat } = this.props;
    const sender = { name: 'User1' };
    return (
      <div>
        <MediaPlayer mediaSource={MediaSources.YOUTUBE} url="cVYvozAWPtc"/>
        <Chat
          messages={chat[0].messages}
          sender={sender}
          onSend={this.onChatSendMessage}
        />
      </div>
    );
  }
}

export default connect((state) => ({
  room: state.rooms[0],
  chat: state.chats,
}))(Room);
