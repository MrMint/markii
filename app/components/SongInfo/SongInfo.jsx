import React, { PropTypes } from 'react';
import { MdAdd } from 'react-icons/lib/md';
import styles from './SongInfo.css';

const SongInfo = ({song}) =>
  <div className={styles.container}>
    <img className={styles.thumbnail} src={song.thumbnail}/>
    <span>{song.name}</span>
    <MdAdd />
  </div>;

export default SongInfo;
