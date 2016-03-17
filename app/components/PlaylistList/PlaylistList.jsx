import React, { Component } from 'react';
import { } from 'material-ui';
import PlaylistListItem from './PlaylistListItem';
import style from './PlaylistList.css';

export default class PlaylistList extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    canAddSong: React.PropTypes.func.isRequired,
  };

  render() {
    const { playlists, canAddSong } = this.props;
    return (
      playlists.length ?
      <div>
      {
        playlists.map(playlist =>
          <PlaylistListItem
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            songCount={playlist.songs.length}
            canAddSong={canAddSong}
          />)
      }
      </div>
      : <div>No playlists :(</div>
    );
  }
}
