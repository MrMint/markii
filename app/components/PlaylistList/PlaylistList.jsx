import React, { Component } from 'react';
import { } from 'material-ui';
import PlaylistListItem from './PlaylistListItem';
import VirtualList from '../VirtualList';
import style from './PlaylistList.css';

export default class PlaylistList extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    canAddSong: React.PropTypes.func.isRequired,
  };

  render() {
    const { playlists, canAddSong } = this.props;
    return (
      playlists ?
      <VirtualList rowHeight={51}>
      {
        playlists.map(playlist =>
          <PlaylistListItem
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            soungCount={playlist.songs.length}
            canAddSong={canAddSong}
          />)
      }
      </VirtualList>
      : <div>No playlists :(</div>
    );
  }
}
