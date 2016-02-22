import React, { Component } from 'react';
import { } from 'material-ui';
import SongSearch from '../SongSearch';
import SongList from '../SongList';
import PlaylistList from '../PlaylistList';
import styles from './PlaylistBuilder.css';
import SongSearchListItem from '../SongList/SongSearchListItem';

export default class PlaylistBuilder extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    searchResults: React.PropTypes.array.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    onAddSongToPlaylist: React.PropTypes.func.isRequired,
  };

  render() {
    const {
      searchResults,
      onSearch,
      playlists,
      onAddSongToPlaylist,
    } = this.props;

    return (
      <div className={styles.container}>
        <PlaylistList playlists={playlists} />
        <SongSearch onSearch={onSearch} />
        <div className={styles.songResults}>
          <SongList rowHeight={81}>
            {
              searchResults && searchResults.length > 0 ?
              searchResults.map(result =>
                <SongSearchListItem
                  key={result.id}
                  title={result.name}
                  source={result.source}
                  thumbnail={result.thumbnail}
                  playlists={playlists}
                  onAddSongToPlaylist={onAddSongToPlaylist}
                />
              )
              : <div>No Results</div>
            }
          </SongList>
        </div>
      </div>
    );
  }
}
