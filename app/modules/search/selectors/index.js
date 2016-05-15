import { createSelector } from 'reselect';
import R from 'ramda';

export const getSearchResultsFactory = () =>
  createSelector(
    [
      (state) => state.searchSongs,
      (state) => state.songs,
    ],
    (search, songs) => R.map(id => songs.get(id))(search)
  );
