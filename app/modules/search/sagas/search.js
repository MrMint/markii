import { call, take, put, race } from 'redux-saga';
import { SEARCH_MEDIA_REQUEST } from '../constants';
import { search } from '../../../utilities/api/youtubeApi';
import { receiveMediaResults } from '../actions';

function* searchYoutube(query) {
  return yield search(query);
}

export function* songSearch() {
  /* eslint-disable */
  while(true) {
  /* eslint-enable */
    const { payload: { query } } = yield take(SEARCH_MEDIA_REQUEST);
    const results = yield call(searchYoutube, query);
    yield put(receiveMediaResults(results));
  }
}
