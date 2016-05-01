import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import SongSearch from '../SongSearch';
import PlaylistList from '../PlaylistList';
import styles from './PlaylistBuilder.css';
import SongSearchListItem from '../SongSearchListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import R from 'ramda';

export default class PlaylistBuilder extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    songs: React.PropTypes.array.isRequired,
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
      selectedPlaylist: null,
    };
  }

  handleSearch = (query) => {
    const { onSearch } = this.props;
    this.setState({ selectedPlaylist: null });
    onSearch(query);
  }

  handleShowSearchResults = () => {
    this.setState({ selectedPlaylist: null });
  }

  renderSong = (song, playlists, canAddSongToPlaylist, onAddSongToPlaylist) =>
    <SongSearchListItem
      key={song.id}
      song={song}
      playlists={playlists}
      canAddSongToPlaylist={canAddSongToPlaylist}
      onAddSongToPlaylist={onAddSongToPlaylist}
    />

  renderPlaylistSongs = () => {
    const { selectedPlaylist } = this.state;
    const {
      playlists,
      songs,
      canAddSongToPlaylist,
      onAddSongToPlaylist,
    } = this.props;

    if (selectedPlaylist.songs.length) {
      return selectedPlaylist.songs
      .map(songIndex => songs[songIndex])
      .map(song => this.renderSong(song, playlists, canAddSongToPlaylist, onAddSongToPlaylist));
    }
    return <div>No songs yet :(</div>;
  }

  renderSearchResults = () => {
    const {
      searchResults,
      playlists,
      canAddSongToPlaylist,
      onAddSongToPlaylist,
    } = this.props;

    if (searchResults && searchResults.length > 0) {
      return searchResults.map(song =>
        this.renderSong(song, playlists, canAddSongToPlaylist, onAddSongToPlaylist)
      );
    }
    return <div>No Results</div>;
  }

  renderSongs = () => {
    const { selectedPlaylist } = this.state;

    if (selectedPlaylist) {
      return this.renderPlaylistSongs();
    }
    return this.renderSearchResults();
  }

  render() {

    return (
      <div className={styles.container}>
          <SongSearch className={styles.searchBar} onSearch={this.handleSearch} />
          <Scrollbars className={styles.songResults}>
              { this.renderSongs() }
          </Scrollbars>
      </div>
    );
  }
}
