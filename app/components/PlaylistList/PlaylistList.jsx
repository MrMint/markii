import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PlaylistListItem from './PlaylistListItem';
import styles from './PlaylistList.css';

export default class PlaylistList extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    canAddSong: React.PropTypes.func.isRequired,
    onPlaylistListItemSelected: React.PropTypes.func.isRequired,
  };

  shouldComponentUpdate = (nextProps) => shallowCompare(this, nextProps);

  render() {
    const { playlists, canAddSong, onPlaylistListItemSelected } = this.props;
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
            onPlaylistListItemSelected={onPlaylistListItemSelected}
          />)
      }
      </div>
      : <div>No playlists :(</div>
    );
  }
}
