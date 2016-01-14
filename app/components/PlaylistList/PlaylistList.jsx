import React, { Component } from 'react';
import { } from 'material-ui';
import PlaylistListItem from './PlaylistListItem';
import style from './PlaylistList.css';

export default class PlaylistBuilder extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
  }

  render() {
    const { playlists } = this.props;
    return (
      <div>
        {
          playlists ?
          playlists.map(playlist =>
            <PlaylistListItem
              name={playlist.name}
              soungCount={playlist.songs.length}
            />)
            : <div>No playlists :(</div>
        }
      </div>
    );
  }
}
