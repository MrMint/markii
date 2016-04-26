import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import MediaPlayer from '../../../components/MediaPlayer';
import Chat from '../../../components/chat';
import PlaylistBuilder from '../../../components/PlaylistBuilder';
import { addSongToPlaylist, createPlaylist } from '../../../modules/playlists/actions';
import * as chatActions from '../../../modules/chat/actions';
import * as searchActions from '../../../modules/search/actions';
import * as queueActions from '../../../modules/queue/actions';
import * as MediaSources from '../../../components/MediaPlayer/constants';
import * as source from '../../../components/MediaPlayer/constants';
import { playlistContainsMedia } from '../../../utilities/playlist';
import R from 'ramda';
import { } from 'material-ui';

class Room extends Component {
  static propTypes = {
    rooms: React.PropTypes.array.isRequired,
    chats: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    search: React.PropTypes.array.isRequired,
    senderName: React.PropTypes.string.isRequired,
    params: React.PropTypes.object.isRequired,
    playlists: React.PropTypes.array.isRequired,
    songs: React.PropTypes.array.isRequired,
    playing: React.PropTypes.object,
  };

  onPushSongToQueue = (songId) => {
    this.props.dispatch(queueActions.pushSong(songId));
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
    dispatch(chatActions.sendMessage(message, this.chat.id));
  };

  onSearch = (query) => {
    const { dispatch } = this.props;
    dispatch(searchActions.searchForMedia(query, [source.YOUTUBE]));
  };

  onAddSongToPlaylist = (song, playlistId) => {
    const { dispatch } = this.props;
    dispatch(addSongToPlaylist({ ...song, id: uuid.v4() }, playlistId));
  };

  onCreatePlaylist = (playlistName) => {
    const { dispatch } = this.props;
    dispatch(createPlaylist({
      id: uuid.v4(),
      name: playlistName,
      songs: [],
    }));
  }

  canAddSongToPlaylist = (mediaSource, sourceId, playlistOrId) => {
    const { songs, playlists } = this.props;
    return !playlistContainsMedia(
      mediaSource,
      sourceId,
      R.is(Object, playlistOrId)
        ? playlistOrId
        : R.find(playlist => playlist.id === playlistOrId)(playlists),
      songs
    );
  };

  // TODO Move room and chat getter logic into a selector using reselect lib
  get room() {
    const { rooms, params: { roomSlug } } = this.props;
    return rooms.find(room => room.slug === roomSlug);
  }

  get chat() {
    const { chats } = this.props;
    return chats[this.room.chatId];
  }

  get playingSong() {
    const { playing, songs } = this.props;
    return songs[playing.song];
  }

  render() {
    const { search, playlists, songs } = this.props;
    const chat = this.chat;
    const playingSong = this.playingSong;

    return (
      <div>
        <MediaPlayer
          mediaSource={playingSong.source}
          url={playingSong.sourceId}
        />
        <Chat
          messages={chat.messages}
          onSend={this.onChatSendMessage}
        />
        <PlaylistBuilder
          searchResults={search}
          onSearch={this.onSearch}
          playlists={playlists}
          songs={songs}
          onAddSongToPlaylist={this.onAddSongToPlaylist}
          canAddSongToPlaylist={this.canAddSongToPlaylist}
          onCreatePlaylist={this.onCreatePlaylist}
        />
      </div>
    );
  }
}

export default connect((state) => ({
  rooms: state.rooms,
  chats: state.chats,
  search: state.searchSongs,
  senderName: state.user.username,
  playlists: state.playlists,
  songs: state.songs,
  playing: state.playing,
}))(Room);
