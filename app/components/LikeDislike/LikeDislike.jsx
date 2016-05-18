import React, { PropTypes } from 'react';
import { MdMood, MdMoodBad } from 'react-icons/lib/md';
import styles from './LikeDislike.css';

const LikeDislike = ({ likeCount, dislikeCount, onLike, onDislike }) =>
  <div className={styles.container}>
    <MdMood className={styles.like} />
    <span>25</span>
    <span>1</span>
    <MdMoodBad className={styles.dislike} />
  </div>;

export default LikeDislike;
