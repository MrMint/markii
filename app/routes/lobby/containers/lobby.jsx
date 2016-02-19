import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui';
import RoomListItem from '../../../components/RoomListItem';
import { routeActions } from 'react-router-redux';

class Lobby extends Component {
  static propTypes = {
    rooms: React.PropTypes.array.isRequired,
    children: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired,
  };

  handleListItemTouchTap = (slug) => {
    this.props.dispatch(routeActions.push(`/r/${slug}`));
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
}))(Lobby);
