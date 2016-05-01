import React, { Component } from 'react';
import PlaylistList from '../../../../components/PlaylistList';
import SongNavItem from '../../../../components/SongNavItem';
import styles from './SongNav.css';
import { TextField, FlatButton } from 'material-ui';
import R from 'ramda';

export default class SongNav extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
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
    const { playlistNameInputValue, selectedPlaylist } = this.state;

    return (

      <div className={styles.playlistList}>
        <SongNavItem primaryText="Search" isActive />
        <SongNavItem primaryText="Queue" />
        <PlaylistList
          playlists={playlists}
          canAddSong={canAddSongToPlaylist}
          onPlaylistListItemSelected={this.handlePlaylistListItemSelected}
        />
        <div className={styles.textInputWrapper}>
          <TextField
            style={{width:'80%'}}
            value={playlistNameInputValue}
            onChange={this.handlePlaylistNameInputChange}
            hintText="Playlist name..."
          />

          <FlatButton
            style={{
              width:'20%',
              minWidth: '0px',
              height:'34px'
            }}
            label="+"
            onTouchTap={this.handleCreatePlaylist}
          />
        </div>
      </div>
    );
  }
}
