import { takeEvery } from 'redux-saga';
import { put, fork, select } from 'redux-saga/effects';
import { addSong } from '../actions';
import { PLAYLISTS_ADD_SONG } from '../../playlists/constants';
import { addSongToPlaylist } from '../../playlists/actions';

function* handleAddSongToPlaylist(action) {
  const { song, playlistId } = action.payload;
  yield put(addSong(song));
  yield put(addSongToPlaylist(song, playlistId));
}

function* watchAddSongToPlaylist() {
  yield takeEvery(PLAYLISTS_ADD_SONG, handleAddSongToPlaylist);
}

export default function* songsSaga() {
  // yield fork(watchAddSongToPlaylist);
}
