import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { SONG_SEARCH_LIST_ITEM } from '../../../utilities/constants/dragTypes';
import { PLAYLIST } from '../../../modules/misc/constants';
import styles from './PlaylistListItem.css';
import SongNavItem from '../../SongNavItem';

class PlaylistListItem extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    songCount: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    canDrop: React.PropTypes.bool.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    canAddSong: React.PropTypes.func.isRequired,
    onAddSong: React.PropTypes.func.isRequired,
    onPlaylistListItemSelected: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayContextMenu: false,
    };
  }

  class = () => {
    const { isOver, canDrop } = this.props;
    if (canDrop) {
      if (isOver) {
        return styles.canDropIsOver;
      }
      return styles.canDrop;
    }
    if (isOver) {
      return styles.canNotDrop;
    }
  };

  handleOnClick = () => {
    const { id, onPlaylistListItemSelected } = this.props;
    onPlaylistListItemSelected(PLAYLIST, id);
  }

  handleContextMenu = (event) => {
    event.preventDefault();
    const { displayContextMenu } = this.state;
    this.setState({ displayContextMenu: !displayContextMenu });
  }

  render() {
    const { name, songCount, connectDropTarget, isActive } = this.props;
    return connectDropTarget(
      <div>
        <SongNavItem
          className={this.class()}
          primaryText={name}
          rightBadge={songCount}
          onTouchTap={this.handleOnClick}
          isActive={isActive}
          onContextMenu={this.handleContextMenu}
        />
      </div>
    );
  }
}

const playlistListItemTarget = {
  canDrop: (props, monitor) => {
    const { id } = props;
    const song = monitor.getItem();
    return props.canAddSong(song.source, song.sourceId, id);
  },
  drop: (props, monitor) => {
    const { id, onAddSong } = props;
    const song = monitor.getItem();
    onAddSong(song, id);
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
