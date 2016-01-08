import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import MediaPlayer from '../../../components/MediaPlayer';
import Chat from '../../../components/chat';
import PlaylistBuilder from '../../../components/PlaylistBuilder';
import * as chatActions from '../../../modules/chat/actions';
import * as MediaSources from '../../../components/MediaPlayer/constants';
import * as searchActions from '../../../modules/search/actions';

import { } from 'material-ui';

class Room extends Component {
  static propTypes = {
    room: React.PropTypes.object.isRequired,
    chat: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    search: React.PropTypes.array.isRequired,
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

  onSearch = (query) => {
    const { dispatch } = this.props;
    dispatch(searchActions.searchForSong(query));
  }

  render() {
    const { chat, songs, search } = this.props;
    const sender = { name: 'User1' };
    return (
      <div>
        <MediaPlayer mediaSource={MediaSources.YOUTUBE} url="cVYvozAWPtc"/>
          <Chat
            messages={chat[0].messages}
            sender={sender}
            onSend={this.onChatSendMessage}
          />
        <PlaylistBuilder searchResults={search} onSearch={this.onSearch}/>
      </div>
    );
  }
}
// 	AIzaSyC3rjN8jBZ3V1Ib8Rio6_kp-WbnootXx_8
export default connect((state) => ({
  room: state.rooms[0],
  chat: state.chats,
  search: state.search,
}))(Room);
