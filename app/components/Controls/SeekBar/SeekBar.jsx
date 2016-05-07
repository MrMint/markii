import React, { PropTypes } from 'react';
import Slider from 'material-ui/Slider';
import styles from './SeekBar.css';

const SeekBar = ({ percentProgress }) =>
  <div className={styles.container}>
    <Slider
      value={percentProgress}
      step={1}
      min={0}
      max={100}
    />
  </div>;

SeekBar.propTypes = {
  percentProgress: PropTypes.number.isRequired,
};

export default SeekBar;
