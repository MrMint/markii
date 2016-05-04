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

export function addSongIdToPlaylist(songId, playlistId) {
  return {
    type: types.PLAYLISTS_ADD_SONG_ID,
    payload: {
      songId,
      playlistId,
    },
  };
}

export function createPlaylist(playlist) {
  return {
    type: types.PLAYLISTS_CREATE,
    payload: {
      playlist,
    },
  };
}
