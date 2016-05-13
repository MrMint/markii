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
  constructor(props) {
    super(props);

    this.state = {
      seekTime: props.playTime || 0,
      isSeeking: false,
    };
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    shallowCompare(this, nextProps, nextState);

  componentWillUnmount = () => {
    this.onTimeUpdatedSubscription.unsubscribe();
  }

  handleSeekChange = (seekTime) => {
    this.setState({ seekTime });
  }

  handleSeekStart = () => {
    requestAnimationFrame(() => {
      this.setState({ isSeeking: true });
      this.props.onSeekStart();
    });
  }

  handleSeekStop = () => {
    this.setState({ isSeeking: false });
    this.props.onSeekChange(this.state.seekTime);
    this.props.onSeekStop();
  }

  render() {
    const {
      playTime,
      duration,
      isPlaying,
      onPlay,
      onPause,
      volume,
      onVolumeChange,
    } = this.props;
    const { seekTime, isSeeking } = this.state;

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
            playTime={isSeeking ? seekTime : playTime}
            duration={duration}
            onSeekStart={this.handleSeekStart}
            onSeekStop={this.handleSeekStop}
            onSeekChange={this.handleSeekChange}
          />
        </div>
        <div className={styles.volumeContainer}>
          <VolumeBar
            volume={volume}
            onVolumeChange={onVolumeChange}
          />
        </div>
      </div>
    );
  }
}

            // onVolumeChange={(volume) => requestAnimationFrame(() => onVolumeChange(volume))}
