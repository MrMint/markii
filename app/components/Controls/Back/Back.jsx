import React, { PropTypes } from 'react';
import { FaStepBackward } from 'react-icons/lib/fa';
import styles from './Back.css';

const Back = ({ onBack, className }) =>
  <div className={`${styles.container} ${className}`}>
    <FaStepBackward onClick={onBack} />
  </div>;

Back.propTypes = {
  onBack: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Back;
