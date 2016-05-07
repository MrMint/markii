import React, { Component, PropTypes } from 'react';
import SeekBar from '../Controls/SeekBar';
import styles from './MediaControl.css';

export default class MediaControl extends Component {
  static propTypes = {
    playTime: PropTypes.number,
    duration: PropTypes.number,
    isPlaying: PropTypes.bool.isRequired,
  }

  render() {
    const { playTime, duration } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.playControlsContainer}>asdf
        </div>
        <div className={styles.seekbarContainer}>
          <SeekBar
            playTime={playTime}
            duration={duration}
          />
        </div>
        <div className={styles.volumeContainer}>asdf
        </div>
      </div>
    );
  }
}
