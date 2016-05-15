import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import { MdApps } from 'react-icons/lib/md';
import R from 'ramda';
import RoomNavItem from '../RoomNavItem';
import styles from './RoomNav.css';

const RoomNav = ({ currentRoom, favoriteRooms }) =>
  <div className={styles.container}>
    <RoomNavItem name="Lobby">
      <MdApps style={{ fontSize: '36px' }} />
    </RoomNavItem>

    <Divider style={{width:'35px', marginBottom:'10px' }}/>
    {R.map(room => <RoomNavItem name={room.name} />)(favoriteRooms)}
  </div>;

RoomNav.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  favoriteRooms: PropTypes.array.isRequired,
};

export default RoomNav;
