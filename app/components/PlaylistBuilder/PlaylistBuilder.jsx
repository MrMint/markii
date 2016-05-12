import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Divider } from 'material-ui';
import SongSearch from '../SongSearch';
import styles from './PlaylistBuilder.css';
import SongSearchListItem from '../SongSearchListItem';
import { Scrollbars } from 'react-custom-scrollbars';

export default class PlaylistBuilder extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    songs: React.PropTypes.array.isRequired,
    searchResults: React.PropTypes.array.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    onAddSongToPlaylist: React.PropTypes.func.isRequired,
    canAddSongToPlaylist: React.PropTypes.func.isRequired,
    onCreatePlaylist: React.PropTypes.func.isRequired,
    onPreview: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      playlistNameInputValue: '',
      selectedPlaylist: null,
    };
  }

  shouldComponentUpdate = (nextProps) => shallowCompare(this, nextProps);

  handleSearch = (query) => {
    const { onSearch } = this.props;
    this.setState({ selectedPlaylist: null });
    onSearch(query);
  }

  renderSong = (song, playlists, canAddSongToPlaylist, onAddSongToPlaylist) => {
    const { onPreview } = this.props;
    return (
      <SongSearchListItem
        key={song.id}
        song={song}
        playlists={playlists}
        canAddSongToPlaylist={canAddSongToPlaylist}
        onAddSongToPlaylist={onAddSongToPlaylist}
        onPreview={onPreview}
      />
    );
  }

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
        <div className={styles.searchContainer}>
          <SongSearch className={styles.searchBar} onSearch={this.handleSearch} />
          <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
        </div>
        <Scrollbars className={styles.songResults}>
            {this.renderSongs()}
        </Scrollbars>
      </div>
    );
  }
}
