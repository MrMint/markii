import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { TextField, FlatButton } from 'material-ui';
import { MdAdd } from 'react-icons/lib/md';
import R from 'ramda';
import PlaylistList from '../PlaylistList';
import SongNavItem from '../SongNavItem';
import styles from './SongNav.css';

export default class SongNav extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    onSelectPlaylist: React.PropTypes.func.isRequired,
    activeSongNavItem: React.PropTypes.string.isRequired,
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

  shouldComponentUpdate = (nextProps, nextState) =>
    shallowCompare(this, nextProps, nextState);

  handlePlaylistNameInputChange = (event) => {
    this.setState({ playlistNameInputValue: event.target.value });
  }

  handlePlaylistListItemSelected = (playlistId) => {
    const { playlists } = this.props;
    this.setState({
      selectedPlaylist: R.find(playlist => playlist.id === playlistId)(playlists),
    });
  }

  handleCreatePlaylist = () => {
    const { onCreatePlaylist } = this.props;
    const { playlistNameInputValue } = this.state;
    onCreatePlaylist(playlistNameInputValue);
    this.setState({ playlistNameInputValue: '' });
  }

  handleShowSearchResults = () => {
    this.setState({ selectedPlaylist: null });
  }

  render() {
    const { playlists, canAddSongToPlaylist } = this.props;
    const { playlistNameInputValue } = this.state;

    return (
      <div className={styles.playlistList}>
        <SongNavItem
          className={styles.navHeader}
          primaryText="Search"
          isActive />
        <SongNavItem primaryText="Queue" />
        <SongNavItem
          className={styles.navHeader}
          primaryText="PLAYLISTS"
          rightBadge={<MdAdd />} />
        <PlaylistList
          playlists={playlists}
          canAddSong={canAddSongToPlaylist}
          onPlaylistListItemSelected={this.handlePlaylistListItemSelected}
        />
        <div className={styles.textInputWrapper}>
          <TextField
            style={{ width: '80%' }}
            value={playlistNameInputValue}
            onChange={this.handlePlaylistNameInputChange}
            hintText="Playlist name..."
          />

          <FlatButton
            style={{
              width: '20%',
              minWidth: '0px',
              height: '34px',
            }}
            label="+"
            onTouchTap={this.handleCreatePlaylist}
          />
        </div>
      </div>
    );
  }
}
