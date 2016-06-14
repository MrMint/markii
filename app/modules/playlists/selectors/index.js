import { createSelector } from 'reselect';
import R from 'ramda';

export const getActivePlaylistFactory = () =>
  createSelector(
    [
      (state) => state.playlists,
      (state) => state.misc.selectedPlaylist,
    ],
    (playlists, playlistId) => R.find(playlist => playlist.id === playlistId)(playlists)
  );
