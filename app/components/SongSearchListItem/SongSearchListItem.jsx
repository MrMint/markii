import React, { Component } from 'react';
import { SelectField, MenuItem } from 'material-ui';
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
  };

  shouldComponentUpdate = (nextProps) => {
    // If the song has changed, rerender
    if (nextProps.song !== this.props.song) return true;

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

  handleChange = (event, index, value) => {
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

  render() {
    const {
      song,
      playlists,
      connectDragSource,
      canAddSongToPlaylist,
    } = this.props;

    return connectDragSource(
      <div className={styles.row}>
        <div className={styles.left}>
          <img className={styles.thumbnail} src={song.thumbnail} />
        </div>
        <div className={styles.center}>
          <div className={styles.title}>{song.name}</div>
        </div>
        <div className={styles.right}>
          { this.renderSourceIcon(song.source) }
        </div>
        { // TODO these selectfields are killing performance, investigate
          // https://github.com/callemall/material-ui/issues/2859
          playlists &&
          <div className={styles.right}>
            <SelectField onChange={this.handleChange} fullWidth>
              {
                R.pipe(R.filter(
                  playlist => canAddSongToPlaylist(song.source, song.sourceId, playlist)
                ), R.map(playlist =>
                <MenuItem
                  value={playlist.id}
                  key={playlist.id}
                  primaryText={playlist.name}
                />)
                )(playlists)
              }
            </SelectField>
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
