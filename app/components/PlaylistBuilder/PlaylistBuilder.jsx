import React, { Component, PropTypes } from 'react';
import { pure } from 'recompose';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import R from 'ramda';
import SongSearch from '../SongSearch';
import { PLAYLIST, SEARCH, QUEUE } from '../../modules/misc/constants';
import styles from './PlaylistBuilder.css';
import SongSearchListItem from '../SongSearchListItem';
import { Scrollbars } from 'react-custom-scrollbars';

class PlaylistBuilder extends Component {
  static propTypes = {
    isSearching: PropTypes.bool.isRequired,
    playlists: PropTypes.array.isRequired,
    songNavSelection: PropTypes.string.isRequired,
    activePlaylist: PropTypes.array.isRequired,
    songs: PropTypes.array.isRequired,
    songsInQueue: PropTypes.array.isRequired,
    searchResults: PropTypes.array.isRequired,
    canAddSongToPlaylist: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onAddSongToPlaylist: PropTypes.func.isRequired,
    onAddSongToQueue: PropTypes.func.isRequired,
    onCreatePlaylist: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      playlistNameInputValue: '',
    };
  }

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
    const {
      playlists,
      songs,
      canAddSongToPlaylist,
      onAddSongToPlaylist,
      activePlaylist,
    } = this.props;

    if (activePlaylist.songs.size) {
      return activePlaylist.songs
      .map(songId => R.find(song => song.id === songId)(songs))
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
    return <div/>;
  }

  renderQueue = () => {
    const {
      songsInQueue,
      playlists,
      canAddSongToPlaylist,
      onAddSongToQueue,
    } = this.props;

    if (songsInQueue && songsInQueue.length > 0) {
      return songsInQueue.map(song =>
        this.renderSong(song, playlists, canAddSongToPlaylist, onAddSongToQueue)
      );
    }
    return <div>No Songs in Queue</div>;
  };

  renderSongs = () => {
    const { songNavSelection } = this.props;
    switch (songNavSelection) {
      case PLAYLIST:
        return this.renderPlaylistSongs();
      case SEARCH:
        return this.renderSearchResults();
      case QUEUE:
        return this.renderQueue();
      default:
        return <div>Error</div>;
    }
  }

  render() {
    const { isSearching } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <SongSearch className={styles.searchBar} onSearch={this.handleSearch} />
          <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
        </div>
        <Scrollbars className={styles.songResults}>
          {
            isSearching
            ? <div className={styles.spinnerContainer}><CircularProgress /></div>
            : this.renderSongs()
          }
        </Scrollbars>
      </div>
    );
  }
}

export default pure(PlaylistBuilder);
