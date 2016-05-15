import React from 'react';
import styles from './SongNavItem.css';

const SongNavItem = ({ primaryText, rightBadge, isActive, className}) => (
  <div className={`${isActive ? styles.active : styles.container} ${className}`}>
    <div>{primaryText}</div>
    <div>{rightBadge}</div>
  </div>
);

export default SongNavItem;
