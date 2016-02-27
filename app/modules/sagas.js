import { fork } from 'redux-saga/effects';
import { authentication } from './user/sagas/auth';
import { songSearch } from './search/sagas/search';
import { user } from './user/sagas/user';
import songs from './songs/sagas/songs';

export default function* root() {
  yield fork(authentication);
  yield fork(songSearch);
  yield fork(user);
  yield fork(songs);
}
