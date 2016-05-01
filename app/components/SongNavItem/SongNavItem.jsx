import React from 'react';
import styles from './SongNavItem.css';

const SongNavItem = ({ primaryText, rightBadge, isActive }) => (
  <div className={isActive ? styles.active : styles.container}>
    <div>{primaryText}</div>
    <div>{rightBadge}</div>
  </div>
);

export default SongNavItem;
