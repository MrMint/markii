import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { SONG_SEARCH_LIST_ITEM } from '../../../utilities/constants/dragTypes';
import { } from 'material-ui';
import styles from './PlaylistListItem.css';

class PlaylistListItem extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    songCount: React.PropTypes.string.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    canDrop: React.PropTypes.bool.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    canAddSong: React.PropTypes.func.isRequired,
  };

  render() {
    const { name, songCount, isOver, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className={styles.row}>
        <div>{name}</div>
        <div>{songCount}</div>
        {isOver.toString()}
      </div>
    );
  }
}

const playlistListItemTarget = {
  canDrop: (props) => props.canAddSong(),
  drop: (props) => {
    return {
      id: props.id,
    };
  },
};

export default DropTarget(
  SONG_SEARCH_LIST_ITEM,
  playlistListItemTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(PlaylistListItem);
