import React, { PropTypes } from 'react';
import Slider from 'material-ui/Slider';
import styles from './SeekBar.css';

const SeekBar = ({ playTime, duration }) =>
  <div className={styles.container}>
    <div>{playTime}</div>
    <Slider
      style={{flexDirection:'column', width:'100%'}}
      value={playTime / duration}
      min={0}
      max={1}
    />
    <div>{duration}</div>
  </div>;

SeekBar.propTypes = {
  playTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default SeekBar;
