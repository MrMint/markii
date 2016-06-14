import * as types from '../constants';
import { Playlist } from '../types';
import { List } from 'immutable';
import R from 'ramda';

const initialState = new List([
  new Playlist({
    id: '0f17d275-3dd7-4311-bba1-75918fc8f001',
    name: 'Best of Miku 2015',
    // songs: new List(['0f17d275-3dd7-4311-bba1-75918fc8f001']),
  }),
  new Playlist({
    id: '0f17d275-3dd7-4311-bba1-7591f334f001',
    name: 'Best of Miku 2014',
  }),
]);

function addSongToPlaylist(state, playlistId, songId) {
  const index = R.findIndex(playlist =>
    playlist.id === playlistId
  )(state);

  if (index >= 0) {
    return state.update(index, record =>
      record.set(
        'songs',
        record.songs.push(songId))
    );
  }
  throw new Error('Unable to find playlist to add song to.');
}

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.PLAYLISTS_REQUEST_SUCCESS:
      return new List(action.payload.playlists);
    case types.PLAYLISTS_ADD_SONG_ID: {
      const { playlistId, songId } = action.payload;
      return addSongToPlaylist(state, playlistId, songId);
    }
    case types.PLAYLISTS_ADD_SONG: {
      const { playlistId, song } = action.payload;
      return addSongToPlaylist(state, playlistId, song.id);
    }
    case types.PLAYLISTS_CREATE:
      return state.push(action.payload.playlist);
    default:
      return state;
  }
}
