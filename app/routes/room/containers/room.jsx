import React, { Component, PropTypes } from 'react';
import { pure } from 'recompose';
import { connect } from 'react-redux';
import uuid from 'uuid';
import R from 'ramda';

import MediaPlayer from '../../../components/MediaPlayer';
import Chat from '../../../components/Chat';
import PlaylistBuilder from '../../../components/PlaylistBuilder';
import SongNav from '../../../components/SongNav';
import SongInfo from '../../../components/SongInfo';
import * as source from '../../../components/MediaPlayer/constants';
import LikeDislike from '../../../components/LikeDislike';

import { addSongToPlaylist, createPlaylist } from '../../../modules/playlists/actions';
import * as chatActions from '../../../modules/chat/actions';
import * as searchActions from '../../../modules/search/actions';
import * as queueActions from '../../../modules/queue/actions';
import * as playingActions from '../../../modules/playing/actions';
import * as miscActions from '../../../modules/misc/actions';

import { getSearchResultsFactory } from '../../../modules/search/selectors';
import { getActivePlaylistFactory } from '../../../modules/playlists/selectors';
import { getSongsInQueueFactory } from '../../../modules/queue/selectors';

import { playlistContainsMedia } from '../../../utilities/playlist';

import styles from './room.css';

class Room extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    chats: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    search: PropTypes.array.isRequired,
    isSearching: PropTypes.bool.isRequired,
    senderName: PropTypes.string.isRequired,
    songNavSelection: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    playlists: PropTypes.array.isRequired,
    activePlaylist: PropTypes.object,
    songs: PropTypes.array.isRequired,
    songsInQueue: PropTypes.array.isRequired,
    playing: PropTypes.object,
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

  handleAddSongToPlaylist = (song, playlistId) => {
    const { dispatch } = this.props;
    dispatch(addSongToPlaylist(song, playlistId));
  };

  handleAddSongToQueue = (songId) => {
    const { dispatch } = this.props;
    dispatch(queueActions.enqueueSong(songId));
  }

  handleCreatePlaylist = (playlistName) => {
    const { dispatch } = this.props;
    dispatch(createPlaylist({
      id: uuid.v4(),
      name: playlistName,
      songs: [],
    }));
  }

  handleSongEnd = () => {
    const { dispatch, songsInQueue } = this.props;
    dispatch(playingActions.ended());

    const song = songsInQueue[0];
    if (song) {
      dispatch(queueActions.popSong());
      dispatch(playingActions.setSong(song.id));
      dispatch(playingActions.startPlaying());
    }

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

  canAddSongToQueue = () => true;

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

  handleSelectPlaylist = (selectionType, playlistId) => {
    const { dispatch, songNavSelection } = this.props;

    if (playlistId) {
      dispatch(miscActions.setActivePlaylist(playlistId));
    }
    if (songNavSelection !== selectionType) {
      dispatch(miscActions.setSongNavSelectionType(selectionType));
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
    const { playlists,
      songs,
      playing,
      search,
      activePlaylist,
      songNavSelection,
      songsInQueue,
      isSearching,
    } = this.props;
    const chat = this.chat;
    const playingSong = this.playingSong;

    return (
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <SongNav
            playlists={playlists}
            activePlaylist={activePlaylist}
            canAddSongToPlaylist={this.canAddSongToPlaylist}
            onAddSongToPlaylist={this.handleAddSongToPlaylist}
            canAddSongToQueue={this.canAddSongToQueue}
            onAddSongToQueue={this.handleAddSongToQueue}
            songNavSelection={songNavSelection}
            onCreatePlaylist={this.onCreatePlaylist}
            onSelectNavItem={this.handleSelectPlaylist}
          />
          <LikeDislike />
          {playingSong && <SongInfo song={playingSong} />}
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
            onEnd={this.handleSongEnd}
            onPlayingChange={this.handlePlayingChange}
          />
          <PlaylistBuilder
            searchResults={search}
            onSearch={this.onSearch}
            playlists={playlists}
            activePlaylist={activePlaylist}
            isSearching={isSearching}
            songs={songs}
            songsInQueue={songsInQueue}
            songNavSelection={songNavSelection}
            onAddSongToPlaylist={this.handleAddSongToPlaylist}
            onAddSongToQueue={this.handleAddSongToQueue}
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

const getSearchResultsSelector = getSearchResultsFactory();
const getActivePlaylistSelector = getActivePlaylistFactory();
const getSongsInQueueSelector = getSongsInQueueFactory();

export default connect((state) => ({
  rooms: state.rooms,
  chats: state.chats,
  isSearching: state.searchSongs.isSearching,
  search: getSearchResultsSelector(state),
  activePlaylist: getActivePlaylistSelector(state),
  senderName: state.user.username,
  playlists: state.playlists,
  songs: state.songs,
  songsInQueue: getSongsInQueueSelector(state),
  playing: state.playing,
  songNavSelection: state.misc.songNavSelection,
}))(pure(Room));
