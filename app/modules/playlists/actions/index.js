import * as types from '../constants';

export function addSongToPlaylist(song, playlistId) {
  return {
    type: types.PLAYLISTS_ADD_SONG,
    payload: {
      song,
      playlistId,
    },
  };
}

export function addSongIndexToPlaylist(songIndex, playlistId) {
  return {
    type: types.PLAYLISTS_ADD_SONG_INDEX,
    payload: {
      songIndex,
      playlistId,
    },
  };
}
