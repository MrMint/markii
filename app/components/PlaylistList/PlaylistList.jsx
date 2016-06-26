import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { PLAYLIST } from '../../modules/misc/constants';
import PlaylistListItem from './PlaylistListItem';
import styles from './PlaylistList.css';

export default class PlaylistList extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    activePlaylist: React.PropTypes.object,
    canAddSong: React.PropTypes.func.isRequired,
    onAddSong: React.PropTypes.func.isRequired,
    songNavSelection: React.PropTypes.string.isRequired,
    onPlaylistListItemSelected: React.PropTypes.func.isRequired,
  };

  shouldComponentUpdate = (nextProps) => shallowCompare(this, nextProps);

  render() {
    const {
      playlists,
      canAddSong,
      onPlaylistListItemSelected,
      songNavSelection,
      activePlaylist,
      onAddSong,
    } = this.props;
    return (
      playlists.size ?
        <div className={styles.playlistsContainer}>
        {
          playlists.map(playlist =>
            <PlaylistListItem
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
              songCount={playlist.songs.size}
              canAddSong={canAddSong}
              onAddSong={onAddSong}
              onPlaylistListItemSelected={onPlaylistListItemSelected}
              isActive={songNavSelection === PLAYLIST && playlist.id === activePlaylist.id}
            />)
        }
        </div>
      : <div>No playlists :(</div>
    );
  }
}
