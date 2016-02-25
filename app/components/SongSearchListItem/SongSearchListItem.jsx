import React, { Component } from 'react';
import { SelectField, MenuItem } from 'material-ui';
import { DragSource as dragSource } from 'react-dnd';
import * as sources from '../MediaPlayer/constants';
import { SONG_SEARCH_LIST_ITEM } from '../../utilities/constants/dragTypes';
import styles from './SongSearchListItem.css';
import { FaYoutube } from 'react-icons/lib/fa';

class SongSearchListItem extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    source: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
    playlists: React.PropTypes.array.isRequired,
    onAddSongToPlaylist: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
  };

  handleChange = (event, index, value) => {
    const {
      title,
      source,
      thumbnail,
      onAddSongToPlaylist,
    } = this.props;
    onAddSongToPlaylist({ name: title, source, thumbnail }, value);
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
      title,
      source,
      thumbnail,
      playlists,
      isDragging,
      connectDragSource,
    } = this.props;

    return connectDragSource(
      <div className={styles.row}>
        <div className={styles.left}>
          <img className={styles.thumbnail} src={thumbnail} />
        </div>
        <div className={styles.center}>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.right}>
          { this.renderSourceIcon(source) }
        </div>
        { // TODO these selectfields are killing performance, investigate
          // https://github.com/callemall/material-ui/issues/2859
          playlists &&
          <div className={styles.right}>
            <SelectField onChange={this.handleChange} fullWidth>
              { playlists.map(playlist =>
                <MenuItem
                  value={playlist.id}
                  key={playlist.id}
                  primaryText={playlist.name}
                />)
              }
            </ SelectField>
          </div>
        }
      </div>
    );
  }
}

const songSearchListItemSource = {
  beginDrag: (props) => {
    const item = { id: props.id };
    return item;
  },

  endDrag: (props, monitor, component) => {
    if (!monitor.didDrop()) {
      return;
    }
    const dropResult = monitor.getDropResult();

    const {
      title,
      source,
      thumbnail,
      onAddSongToPlaylist,
    } = props;
    onAddSongToPlaylist({ name: title, source, thumbnail }, dropResult.id);
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
