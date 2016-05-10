import React, { PropTypes } from 'react';
import styles from './PlayPause.css';
import { FaPlay, FaPause } from 'react-icons/lib/fa';

const PlayPause = ({ isPlaying, onPlay, onPause }) =>
  <div className={styles.container}>
    {
      isPlaying
      ? <FaPause onClick={onPause} />
      : <FaPlay onClick={onPlay} />
    }
  </div>;

PlayPause.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

export default PlayPause;
