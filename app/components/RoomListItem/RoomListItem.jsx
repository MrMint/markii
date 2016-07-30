import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui';

export default class RoomListItem extends PureComponent {
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
