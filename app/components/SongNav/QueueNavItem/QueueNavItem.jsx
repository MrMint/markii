import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { SONG_SEARCH_LIST_ITEM } from '../../../utilities/constants/dragTypes';
import SongNavItem from '../../SongNavItem';
import styles from './QueueNavItem.css';

function className(isOver, canDrop) {
  if (canDrop) {
    if (isOver) {
      return styles.canDropIsOver;
    }
    return styles.canDrop;
  }
  if (isOver) {
    return styles.canNotDrop;
  }
  return '';
}

const QueueNavItem = ({
  onTouchTap,
  isActive,
  onContextMenu,
  isOver,
  canDrop,
  canAddSong,
  onAddSong,
  connectDropTarget,
}) =>
  connectDropTarget(
    <div>
      <SongNavItem
        className={className(isOver, canDrop)}
        primaryText="QUEUE"
        onTouchTap={onTouchTap}
        isActive={isActive}
        onContextMenu={onContextMenu}
      />
    </div>
  );

QueueNavItem.propTypes = {
  onTouchTap: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  canAddSong: PropTypes.func.isRequired,
};

const queueNavItemTarget = {
  canDrop: (props, monitor) => {
    const song = monitor.getItem();
    return props.canAddSong(song.source, song.sourceId);
  },
  drop: (props, monitor) => {
    const { onAddSong } = props;
    const song = monitor.getItem();
    onAddSong(song.id);
  },
};

export default DropTarget(
  SONG_SEARCH_LIST_ITEM,
  queueNavItemTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(QueueNavItem);
