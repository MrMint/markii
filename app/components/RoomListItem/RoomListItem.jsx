import React, { Component } from 'react';
import { pure } from 'recompose';
import { ListItem } from 'material-ui';

class RoomListItem extends Component {
  static propTypes = {
    roomId: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    currentlyPlaying: React.PropTypes.string.isRequired,
  };

  handleTouchTap = () => {
    const { onClick, slug } = this.props;
    onClick(slug);
  };

  render() {
    const { roomId, name, currentlyPlaying } = this.props;
    return (
      <ListItem
        key={roomId}
        primaryText={name}
        secondaryText={currentlyPlaying}
        onTouchTap={this.handleTouchTap}
      />
    );
  }
}

export default pure(RoomListItem);
