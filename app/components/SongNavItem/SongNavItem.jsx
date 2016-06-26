import React, { PropTypes } from 'react';
import styles from './SongNavItem.css';

const SongNavItem = ({
  primaryText,
  rightBadge,
  isActive,
  className,
  onTouchTap,
  onContextMenu,
}) => (
  <div
    onClick={onTouchTap}
    onContextMenu={onContextMenu}
    className={`${isActive ? styles.active : styles.container} ${className}`}
  >
    <div>{primaryText}</div>
    <div>{rightBadge}</div>
  </div>
);

SongNavItem.propTypes = {
  primaryText: PropTypes.string.isRequired,
  rightBadge: PropTypes.node,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onTouchTap: PropTypes.func,
  onContextMenu: PropTypes.func,
};

export default SongNavItem;
