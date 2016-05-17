import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import uuid from 'uuid';
import R from 'ramda';

import MediaPlayer from '../../../components/MediaPlayer';
import Chat from '../../../components/Chat';
import PlaylistBuilder from '../../../components/PlaylistBuilder';
import SongNav from '../../../components/SongNav';
import SongInfo from '../../../components/SongInfo';

import { addSongToPlaylist, createPlaylist } from '../../../modules/playlists/actions';
import * as chatActions from '../../../modules/chat/actions';
import * as searchActions from '../../../modules/search/actions';
import * as queueActions from '../../../modules/queue/actions';
import * as playingActions from '../../../modules/playing/actions';

import * as source from '../../../components/MediaPlayer/constants';
import { playlistContainsMedia } from '../../../utilities/playlist';

import { getSearchResultsFactory } from '../../../modules/search/selectors';
import styles from './room.css';

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

  handleOnAddSongToPlaylist = (song, playlistId) => {
    const { dispatch } = this.props;
    dispatch(addSongToPlaylist(song, playlistId));
  };

  handleCreatePlaylist = (playlistName) => {
    const { dispatch } = this.props;
    dispatch(createPlaylist({
      id: uuid.v4(),
      name: playlistName,
      songs: [],
    }));
  }

  handleOnPreview = (songId) => {
    const { dispatch, playing } = this.props;
    dispatch(queueActions.pushSong(playing.songId));
    dispatch(playingActions.setSong(songId));
    dispatch(playingActions.startPlaying());
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

  handleTimeUpdate = (time, timestamp) => {
    const { dispatch, playing } = this.props;
    if (!playing.isSeeking) {
      dispatch(playingActions.setPlayTime(time, timestamp));
    }
  }

  handleDuration = (duration) => {
    const { dispatch } = this.props;
    dispatch(playingActions.setDuration(duration));
  }

  handlePlayingChange = (isPlaying) => {
    const { dispatch } = this.props;
    if (isPlaying) {
      dispatch(playingActions.startPlaying());
    } else {
      dispatch(playingActions.stopPlaying());
    }
  }

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
    return songs.get(playing.songId);
  }

  render() {
    const { playlists, songs, playing, search } = this.props;
    const chat = this.chat;
    const playingSong = this.playingSong;

    return (
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <SongNav
            playlists={playlists}
            canAddSongToPlaylist={this.canAddSongToPlaylist}
            onCreatePlaylist={this.onCreatePlaylist}
          />
        {playingSong && <SongInfo song={playingSong}/>}
        </div>
        <div className={styles.mainContent}>
          <MediaPlayer
            mediaSource={playingSong.source}
            url={playingSong.sourceId}
            isPlaying={playing.isPlaying}
            isSeeking={playing.isSeeking}
            time={playing.seek.time}
            volume={playing.volume}
            onTimeUpdate={this.handleTimeUpdate}
            onDuration={this.handleDuration}
            onPlayingChange={this.handlePlayingChange}
          />
          <PlaylistBuilder
            searchResults={search}
            onSearch={this.onSearch}
            playlists={playlists}
            songs={songs}
            onAddSongToPlaylist={this.handleOnAddSongToPlaylist}
            canAddSongToPlaylist={this.canAddSongToPlaylist}
            onCreatePlaylist={this.handleCreatePlaylist}
            onPreview={this.handleOnPreview}
          />
        </div>
        <div className={styles.rightContainer}>
          <Chat
            messages={chat.messages}
            onSend={this.onChatSendMessage}
          />
        </div>
      </div>
    );
  }
}

const getSearchResults = getSearchResultsFactory();

export default connect((state) => ({
  rooms: state.rooms,
  chats: state.chats,
  search: getSearchResults(state),
  senderName: state.user.username,
  playlists: state.playlists,
  songs: state.songs,
  playing: state.playing,
}))(Room);
