import React, { Component } from 'react';
import { Popover, Menu, MenuItem, FlatButton } from 'material-ui';
import { DragSource as dragSource } from 'react-dnd';
import * as sources from '../MediaPlayer/constants';
import { SONG_SEARCH_LIST_ITEM } from '../../utilities/constants/dragTypes';
import styles from './SongSearchListItem.css';
import { FaYoutube } from 'react-icons/lib/fa';
import R from 'ramda';

class SongSearchListItem extends Component {
  static propTypes = {
    song: React.PropTypes.object.isRequired,
    playlists: React.PropTypes.array.isRequired,
    onAddSongToPlaylist: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    canAddSongToPlaylist: React.PropTypes.func.isRequired,
    onPreview: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // If the song has changed, rerender
    if (nextProps.song !== this.props.song) return true;

    // If the state has changed, rerender
    if (nextState.open !== this.state.open) return true;
    if (nextState.anchorEl !== this.state.anchorEl) return true

    if (nextProps.playlists !== this.props.playlists) {
      const diff = R.without(this.props.playlists, nextProps.playlists);

      // If none of the playlists are different, do not rerender
      if (R.isEmpty(diff)) return false;

      const findPlaylist = R.curry((id, playlist) => playlist.id === id);
      const { song: { source, sourceId }, canAddSongToPlaylist } = nextProps;
      const hasCanAddSongChanged = (a, b) => {
        if (a && b) {
          return canAddSongToPlaylist(source, sourceId, a)
          !== canAddSongToPlaylist(source, sourceId, b);
        }
        // We created a new playlist, rerender
        return true;
      };

      // If the ability to add this song to a playlist has changed, rerender
      if (R.any(playlist =>
          hasCanAddSongChanged(
            R.find(findPlaylist(playlist.id))(this.props.playlists),
            playlist)
          )(diff)) return true;
    }

    return false;
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleTouchTapAddToPlaylist = (event, value) => {
    const {
      song,
      onAddSongToPlaylist,
      canAddSongToPlaylist,
    } = this.props;

    if (canAddSongToPlaylist(song.source, song.sourceId, value)) {
      onAddSongToPlaylist(song, value);
    }
  }

  renderSourceIcon = (source) => {
    switch (source) {
      case sources.YOUTUBE:
        return <FaYoutube className={styles.source} />;
      default:
        return <div>Unkown Source</div>;
    }
  }

  handleOnPreview = () => {
    const { onPreview, song } = this.props;
    onPreview(song.id);
  }

  render() {
    const {
      song,
      playlists,
      connectDragSource,
      canAddSongToPlaylist,
    } = this.props;

    const { open, anchorEl } = this.state;

    return connectDragSource(
      <div className={styles.row}>
        <div className={styles.left}>
          <img className={styles.thumbnail} src={song.thumbnail} />
        </div>
        <div className={styles.center}>
          <div className={styles.title}>{song.name}</div>
        </div>
        {
          <div className={styles.right}>
            <FlatButton label="Preview" onTouchTap={this.handleOnPreview}/>
            <FlatButton label="Add" onTouchTap={this.handleTouchTap}/>
            <Popover
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
              <Menu
                onChange={this.handleTouchTapAddToPlaylist}
              >
              {
                R.map(playlist =>
                  <MenuItem
                    value={playlist.id}
                    key={playlist.id}
                    primaryText={playlist.name}
                    checked={!canAddSongToPlaylist(song.source, song.sourceId, playlist)}
                  />
                )(playlists)
              }
              </Menu>
            </Popover>
            { this.renderSourceIcon(song.source) }
          </div>
        }
      </div>
    );
  }
}

const songSearchListItemSource = {
  beginDrag: (props) => {
    const { id, source, sourceId } = props.song;
    const item = { id, source, sourceId };
    return item;
  },

  endDrag: (props, monitor) => {
    if (!monitor.didDrop()) {
      return;
    }
    const dropResult = monitor.getDropResult();

    const {
      song,
      onAddSongToPlaylist,
    } = props;
    onAddSongToPlaylist(song, dropResult.id);
  },
};

export default dragSource(
  SONG_SEARCH_LIST_ITEM,
  songSearchListItemSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)(SongSearchListItem);
