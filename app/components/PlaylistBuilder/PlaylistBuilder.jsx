import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import SongSearch from '../SongSearch';
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
    onCreatePlaylist: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      playlistNameInputValue: '',
    };
  }

  handleCreatePlaylist = () => {
    const { onCreatePlaylist } = this.props;
    const { playlistNameInputValue } = this.state;
    onCreatePlaylist(playlistNameInputValue);
    this.setState({ playlistNameInputValue: '' });
  }

  handlePlaylistNameInputChange = (event) => {
    this.setState({ playlistNameInputValue: event.target.value });
  }

  render() {
    const {
      searchResults,
      onSearch,
      playlists,
      onAddSongToPlaylist,
      canAddSongToPlaylist,
    } = this.props;
    const { playlistNameInputValue } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.playlistList}>
          <PlaylistList
            playlists={playlists}
            canAddSong={canAddSongToPlaylist}
          />
        <TextField
          value={playlistNameInputValue}
          onChange={this.handlePlaylistNameInputChange}
        />
        <RaisedButton label="Create" onTouchTap={this.handleCreatePlaylist} />
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
