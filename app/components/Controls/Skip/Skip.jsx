import React, { PropTypes } from 'react';
import { FaArrowRight } from 'react-icons/lib/fa';
import styles from './Skip.css';

const Skip = ({ onSkip }) =>
  <div className={styles.container}>
    <FaArrowRight onClick={onSkip} />
  </div>;

Skip.propTypes = {
  onSkip: PropTypes.func.isRequired,
};

export default Skip;
