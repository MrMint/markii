import React, { Component } from 'react';
import { } from 'material-ui';
import SongSearch from '../SongSearch';
import VirtualList from '../VirtualList';
import PlaylistList from '../PlaylistList';
import styles from './PlaylistBuilder.css';
import SongSearchListItem from '../SongSearchListItem';

export default class PlaylistBuilder extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    searchResults: React.PropTypes.array.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    onAddSongToPlaylist: React.PropTypes.func.isRequired,
    canAddSongToPlaylist: React.PropTypes.func.isRequired,
  };

  render() {
    const {
      searchResults,
      onSearch,
      playlists,
      onAddSongToPlaylist,
      canAddSongToPlaylist,
    } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.playlistList}>
          <PlaylistList
            playlists={playlists}
            canAddSong={canAddSongToPlaylist}
          />
        </div>
        <div className={styles.search}>
          <SongSearch className={styles.searchBar} onSearch={onSearch} />
          <div className={styles.songResults}>
            <div>
                {
                  searchResults && searchResults.length > 0 ?
                  searchResults.map(result =>
                    <SongSearchListItem
                      key={result.id}
                      song={result}
                      playlists={playlists}
                      canAddSongToPlaylist={canAddSongToPlaylist}
                      onAddSongToPlaylist={onAddSongToPlaylist}
                    />
                  )
                  : <div>No Results</div>
                }
              </div>
          </div>
        </div>
      </div>
    );
  }
}
