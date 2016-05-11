import React, { PropTypes } from 'react';
import { FaArrowLeft } from 'react-icons/lib/fa';
import styles from './Back.css';

const Back = ({ onBack }) =>
  <div className={styles.container}>
    <FaArrowLeft onClick={onBack} />
  </div>;

Back.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default Back;
