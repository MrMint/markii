import React, { Component, PropTypes } from 'react';
import SeekBar from '../Controls/SeekBar';
import PlayPause from '../Controls/PlayPause';
import Skip from '../Controls/Skip';
import Back from '../Controls/Back';
import VolumeBar from '../Controls/VolumeBar';
import styles from './MediaControl.css';
import shallowCompare from 'react-addons-shallow-compare';

export default class MediaControl extends Component {
  static propTypes = {
    playTime: PropTypes.number,
    duration: PropTypes.number,
    isPlaying: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
    onSeekStart: PropTypes.func.isRequired,
    onSeekStop: PropTypes.func.isRequired,
    onSeekChange: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = (nextProps) => shallowCompare(this, nextProps);

  render() {
    const {
      playTime,
      duration,
      isPlaying,
      onPlay,
      onPause,
      volume,
      onVolumeChange,
      onSeekStart,
      onSeekStop,
      onSeekChange,
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.playControlsContainer}>
          <Back className={styles.back} />
          <PlayPause
            className={styles.playPause}
            isPlaying={isPlaying}
            onPlay={onPlay}
            onPause={onPause}
          />
          <Skip className={styles.skip} />
        </div>
        <div className={styles.seekbarContainer}>
          <SeekBar
            playTime={playTime}
            duration={duration}
            onSeekStart={onSeekStart}
            onSeekStop={onSeekStop}
            onSeekChange={onSeekChange}
          />
        </div>
        <div className={styles.volumeContainer}>
          <VolumeBar volume={volume} onVolumeChange={onVolumeChange} />
        </div>
      </div>
    );
  }
}
