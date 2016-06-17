import { createSelector } from 'reselect';
import R from 'ramda';

export const getSongsInQueueFactory = () =>
  createSelector(
    [
      (state) => state.queue,
      (state) => state.songs,
    ],
    (queue, songs) => R.map(id => songs.get(id))(queue)
  );
