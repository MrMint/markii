import React, { Component } from 'react';
import { pure } from 'recompose';
import { Card, CardHeader } from 'material-ui/Card';
import styles from './RoomListItem.css';

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
      <Card
        key={roomId}
        className={styles.container}
        primaryText={name}
        secondaryText={currentlyPlaying}
        onTouchTap={this.handleTouchTap}
      >
        <CardHeader
          title={name}
        />
      </Card>
    );
  }
}

export default pure(RoomListItem);
