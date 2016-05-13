import React, { PropTypes } from 'react';
import Slider from 'material-ui/Slider';
import styles from './VolumeBar.css';
import { FaVolumeOff, FaVolumeDown, FaVolumeUp } from 'react-icons/lib/fa';

const VolumeBar = ({ volume, onVolumeChange }) =>
  <div className={styles.container}>
    <div className={styles.volumeIcon}>
      {volume === 0 && <FaVolumeOff className={styles.volumeOffFix}/>}
      {volume > 0 && volume <= 75 && <FaVolumeDown />}
      {volume > 75 && <FaVolumeUp />}
    </div>
    <Slider
      className={styles.slider}
      onChange={(event, value) => onVolumeChange(value)}
      value={volume}
      min={0}
      max={100}
      step={1}
    />
  </div>;

VolumeBar.propTypes = {
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
};

export default VolumeBar;
