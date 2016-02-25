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
        <div className={styles.playlistList}>
          <PlaylistList playlists={playlists} />
        </div>
        <div className={styles.search}>
          <SongSearch className={styles.searchBar} onSearch={onSearch} />
          <div className={styles.songResults}>
            <VirtualList rowHeight={81}>
                {
                  searchResults && searchResults.length > 0 ?
                  searchResults.map(result =>
                    <SongSearchListItem
                      key={result.id}
                      id={result.id}
                      title={result.name}
                      source={result.source}
                      thumbnail={result.thumbnail}
                      playlists={playlists}
                      onAddSongToPlaylist={onAddSongToPlaylist}
                    />
                  )
                  : <div>No Results</div>
                }
              </VirtualList>
          </div>
        </div>
      </div>
    );
  }
}
