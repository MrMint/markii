import React, { PropTypes } from 'react';
import { FaStepForward } from 'react-icons/lib/fa';
import styles from './Skip.css';

const Skip = ({ onSkip, className }) =>
  <div className={`${styles.container} ${className}`}>
    <FaStepForward onClick={onSkip} />
  </div>;

Skip.propTypes = {
  onSkip: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Skip;
