import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import { Scrollbars } from 'react-custom-scrollbars';
import { MdAdd } from 'react-icons/lib/md';
import styles from './SongInfo.css';

const SongInfo = ({ song }) =>
  <div className={styles.container}>
    <img className={styles.thumbnail} src={song.thumbnail} />
    <div className={styles.nameContainer}>
      <Scrollbars>
        <div className={styles.name}>{song.name}</div>
      </Scrollbars>
    </div>
    <MdAdd className={styles.add} />
  </div>;

SongInfo.propTypes = {
  song: PropTypes.object.isRequired,
};

export default pure(SongInfo);
