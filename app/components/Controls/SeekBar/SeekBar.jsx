import React, { PropTypes } from 'react';
import Slider from 'material-ui/Slider';
import styles from './SeekBar.css';
import { formatSecondsAsMinutes } from '../../../utilities/misc';

const SeekBar = ({ playTime, duration, onSeekChange, onSeekStart, onSeekStop }) =>
  <div className={styles.container}>
    <div className={styles.spacer}>{formatSecondsAsMinutes(playTime)}</div>
    <Slider
      className={styles.slider}
      value={playTime / duration}
      min={0}
      max={1}
      onChange={(event, value) => onSeekChange(value * duration)}
      onDragStart={() => onSeekStart()}
      onDragStop={() => onSeekStop()}
    />
    <div>{formatSecondsAsMinutes(duration)}</div>
  </div>;

SeekBar.propTypes = {
  playTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onSeekChange: PropTypes.func.isRequired,
  onSeekStart: PropTypes.func.isRequired,
  onSeekStop: PropTypes.func.isRequired,
};

export default SeekBar;
