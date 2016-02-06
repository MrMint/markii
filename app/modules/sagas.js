import { fork } from 'redux-saga';
import { authentication } from './user/sagas/auth';
import { songSearch } from './search/sagas/search';

export default function* root() {
  yield fork(authentication);
  yield fork(songSearch);
}
