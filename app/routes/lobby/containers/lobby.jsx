import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui';

class Lobby extends Component {
  static propTypes = {
    rooms: React.PropTypes.array.isRequired,
  }

  render() {
    const { rooms } = this.props;
    return (
      <List>
        {
          rooms.map((room, index) =>
            <ListItem
              key={index}
              primaryText={room.name}
              secondaryText={room.currentlyPlaying}
            />
          )
        }
      </List>
    );
  }
}

export default connect(state => ({
  rooms: state.rooms,
}))(Lobby);
