import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import MediaPlayer from '../../../components/MediaPlayer';
import Chat from '../../../components/chat';
import PlaylistBuilder from '../../../components/PlaylistBuilder';
import * as chatActions from '../../../modules/chat/actions';
import * as MediaSources from '../../../components/MediaPlayer/constants';
import * as searchActions from '../../../modules/search/actions';
import * as source from '../../../components/MediaPlayer/constants';

import { } from 'material-ui';

class Room extends Component {
  static propTypes = {
    room: React.PropTypes.object.isRequired,
    chat: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    search: React.PropTypes.array.isRequired,
    senderName: React.PropTypes.object.isRequired,
  };

  onChatSendMessage = (text) => {
    const { dispatch, senderName } = this.props;
    const message = {
      id: uuid.v4(),
      sender: {
        name: senderName,
      },
      text,
      timeSent: (new Date()).getTime(),
    };
    dispatch(chatActions.sendMessage(message, '0'));
  };

  onSearch = (query) => {
    const { dispatch } = this.props;
    dispatch(searchActions.searchForMedia(query, [source.YOUTUBE]));
  };

  render() {
    const { chat, search } = this.props;
    return (
      <div>
        <MediaPlayer mediaSource={MediaSources.YOUTUBE} url="cVYvozAWPtc"/>
          <Chat
            messages={chat[0].messages}
            onSend={this.onChatSendMessage}
          />
        <PlaylistBuilder searchResults={search} onSearch={this.onSearch}/>
      </div>
    );
  }
}

export default connect((state) => ({
  room: state.rooms[0],
  chat: state.chats,
  search: state.searchSongs,
  senderName: state.user.username,
}))(Room);
