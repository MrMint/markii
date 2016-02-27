import { takeEvery } from 'redux-saga';
import { put, fork, select } from 'redux-saga/effects';
import { addSong } from '../actions';
import { PLAYLISTS_ADD_SONG } from '../../playlists/constants';
import { addSongIndexToPlaylist } from '../../playlists/actions';

function* addSongToPlaylist(action) {
  const { song, playlistId } = action.payload;
  yield put(addSong(song));
  const { songs } = yield select();
  const songIndex = songs.length - 1;
  yield put(addSongIndexToPlaylist(songIndex, playlistId));
}

function* watchAddSongToPlaylist() {
  yield takeEvery(PLAYLISTS_ADD_SONG, addSongToPlaylist);
}

export default function* songsSaga() {
  yield fork(watchAddSongToPlaylist);
}
