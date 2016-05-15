import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import { MdApps } from 'react-icons/lib/md';
import R from 'ramda';
import NavItem from '../NavItem';
import styles from './Nav.css';

const Nav = ({
  currentRoomSlug,
  rooms,
  onLobbyTouchTap,
  onRoomNavItemTouchTap,
}) =>
  <div className={styles.container}>
    <NavItem
      name="Lobby"
      slug="lobby"
      isActive={!currentRoomSlug}
      onNavigate={onLobbyTouchTap}
    >
      <MdApps style={{ fontSize: '36px' }} />
    </NavItem>

    <Divider style={{ width: '35px', marginBottom: '10px' }} />
    {
      R.map(room =>
        <NavItem
          name={room.name}
          slug={room.slug}
          isActive={currentRoomSlug === room.slug}
          onNavigate={onRoomNavItemTouchTap}
        />)(rooms)
    }
  </div>;

Nav.propTypes = {
  currentRoomSlug: PropTypes.string.isRequired,
  rooms: PropTypes.array.isRequired,
  onLobbyTouchTap: PropTypes.func.isRequired,
  onRoomNavItemTouchTap: PropTypes.func.isRequired,
};

export default Nav;
