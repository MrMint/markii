import React, { Component, PropTypes } from 'react';
import SeekBar from '../Controls/SeekBar';
import PlayPause from '../Controls/PlayPause';
import styles from './MediaControl.css';

export default class MediaControl extends Component {
  static propTypes = {
    playTime: PropTypes.number,
    duration: PropTypes.number,
    isPlaying: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
  }

  render() {
    const { playTime, duration, isPlaying, onPlay, onPause } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.playControlsContainer}>
          <PlayPause
            isPlaying={isPlaying}
            onPlay={onPlay}
            onPause={onPause}
          />
        </div>
        <div className={styles.seekbarContainer}>
          <SeekBar
            playTime={playTime}
            duration={duration}
          />
        </div>
        <div className={styles.volumeContainer}>
        </div>
      </div>
    );
  }
}
