import * as types from '../constants';
import { fetchSongsByKeyword } from '../../../utilities/api/songApi';

function searchYoutube() {
  return {
    type: types.SEARCH_YOUTUBE_REQUEST,
  };
}

export function receiveMediaResults(results) {
  return {
    type: types.SEARCH_MEDIA_REQUEST_SUCCESS,
    payload: {
      results,
    },
  };
}

export function clearSongSearchResults() {
  return {
    type: types.SEARCH_SONG_CLEAR_RESULTS,
  };
}

export function searchForMedia(query, sources) {
  return {
    type: types.SEARCH_MEDIA_REQUEST,
    payload: {
      query,
      sources,
    },
  };
}
