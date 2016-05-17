import React, { PropTypes } from 'react';
import { MdAdd } from 'react-icons/lib/md';

const SongInfo = ({song}) =>
  <div>
    <img src={song.thumbnail}/>
    <span>{song.name}</span>
    <MdAdd />
  </div>;
