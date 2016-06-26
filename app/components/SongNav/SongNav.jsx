import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { TextField, FlatButton } from 'material-ui';
import { MdAdd } from 'react-icons/lib/md';
import { SEARCH, QUEUE } from '../../modules/misc/constants';
import PlaylistList from '../PlaylistList';
import QueueNavItem from './QueueNavItem';
import SongNavItem from '../SongNavItem';
import styles from './SongNav.css';

export default class SongNav extends Component {
  static propTypes = {
    playlists: React.PropTypes.array.isRequired,
    activePlaylist: React.PropTypes.object,
    songNavSelection: React.PropTypes.string.isRequired,
    onSelectNavItem: React.PropTypes.func.isRequired,
    activeSongNavItem: React.PropTypes.string.isRequired,
    canAddSongToPlaylist: React.PropTypes.func.isRequired,
    onAddSongToPlaylist: React.PropTypes.func.isRequired,
    canAddSongToQueue: React.PropTypes.func.isRequired,
    onAddSongToQueue: React.PropTypes.func.isRequired,
    onCreatePlaylist: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      playlistNameInputValue: '',
    };
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    shallowCompare(this, nextProps, nextState);

  handlePlaylistNameInputChange = (event) => {
    this.setState({ playlistNameInputValue: event.target.value });
  }

  handleCreatePlaylist = () => {
    const { onCreatePlaylist } = this.props;
    const { playlistNameInputValue } = this.state;
    onCreatePlaylist(playlistNameInputValue);
    this.setState({ playlistNameInputValue: '' });
  }

  render() {
    const {
      playlists,
      canAddSongToPlaylist,
      onAddSongToPlaylist,
      onSelectNavItem,
      activePlaylist,
      songNavSelection,
      canAddSongToQueue,
      onAddSongToQueue,
    } = this.props;
    const { playlistNameInputValue } = this.state;

    return (
      <div className={styles.playlistList}>
        <SongNavItem
          className={styles.navHeader}
          primaryText="Search"
          onTouchTap={() => onSelectNavItem(SEARCH)}
          isActive={songNavSelection === SEARCH}
        />
        <QueueNavItem
          primaryText="Queue"
          onTouchTap={() => onSelectNavItem(QUEUE)}
          isActive={songNavSelection === QUEUE}
          canAddSong={canAddSongToQueue}
          onAddSong={onAddSongToQueue}
        />
        <SongNavItem
          className={styles.navHeader}
          primaryText="PLAYLISTS"
          rightBadge={<MdAdd />}
        />
        <PlaylistList
          playlists={playlists}
          activePlaylist={activePlaylist}
          songNavSelection={songNavSelection}
          canAddSong={canAddSongToPlaylist}
          onPlaylistListItemSelected={onSelectNavItem}
          onAddSong={onAddSongToPlaylist}
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
