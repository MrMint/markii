import React, { Component } from 'react';
import { pure } from 'recompose';
import { connect } from 'react-redux';
import { List } from 'material-ui';
import RoomListItem from '../../../components/RoomListItem';
import { browserHistory } from 'react-router';

class Lobby extends Component {
  static propTypes = {
    rooms: React.PropTypes.array.isRequired,
    children: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired,
  };

  handleListItemTouchTap = (slug) => {
    browserHistory.push(`/r/${slug}`);
  };

  render() {
    const { rooms, children } = this.props;
    return (
      children ||
        <List>
        {rooms.map(room =>
          <RoomListItem
            roomId={room.id}
            name={room.name}
            slug={room.slug}
            currentlyPlaying={room.currentlyPlaying}
            onClick={this.handleListItemTouchTap}
          />
          )}
        </List>
    );
  }
}

export default connect(state => ({
  rooms: state.rooms,
}))(pure(Lobby));
