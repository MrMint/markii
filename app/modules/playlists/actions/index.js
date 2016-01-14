import * as types from '../constants';
import * as songActions from '../../songs/actions';

function addSongToPlaylistInternal(songIndex, playlistIndex) {
  return {
    type: types.PLAYLISTS_ADD_SONG,
    payload: {
      songIndex,
      playlistIndex,
    },
  };
}

export function addSongToPlaylist(song, playlistId) {
  return (dispatch, getState) => {
    dispatch(songActions.addSong(song));
    const state = getState();
    const songIndex = state.songs.length - 1;
    const playlistIndex = state.playlists.findIndex((playlist) => {
      return playlist.id === playlistId;
    });
    dispatch(addSongToPlaylistInternal(songIndex, playlistIndex));
  };
}
