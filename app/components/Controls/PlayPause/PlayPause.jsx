import React, { PropTypes } from 'react';
import styles from './PlayPause.css';
import { FaPlay, FaPause } from 'react-icons/lib/fa';

const PlayPause = ({ isPlaying, onPlay, onPause, className }) =>
  <div className={`${styles.container} ${className}`}>
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
  className: PropTypes.string,
};

export default PlayPause;
