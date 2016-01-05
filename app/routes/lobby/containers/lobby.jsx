import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui';

class Lobby extends Component {
  static propTypes = {
    rooms: React.PropTypes.array.isRequired,
    children: React.PropTypes.object.isRequired,
  }

  render() {
    const { rooms, children } = this.props;
    return (
      children ?
        children
      :
      <List>
        {rooms.map(room =>
            <ListItem
              key={room.id}
              primaryText={room.name}
              secondaryText={room.currentlyPlaying}
            />
          )}
      </List>
    );
  }
}

export default connect(state => ({
  rooms: state.rooms,
}))(Lobby);
