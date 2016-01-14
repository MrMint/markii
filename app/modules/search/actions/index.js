import * as types from '../constants';
import { fetchSongsByKeyword } from '../../../utilities/api/songApi';

function searchYoutube() {
  return {
    type: types.SEARCH_YOUTUBE_REQUEST,
  };
}

function receiveYoutubeSearchResults(results) {
  return {
    type: types.SEARCH_YOUTUBE_REQUEST_SUCCESS,
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

export function searchForSong(query) {
  return (dispatch) => {
    dispatch(searchYoutube());
    fetchSongsByKeyword(query)
      .then(result => {
        dispatch(clearSongSearchResults());
        dispatch(receiveYoutubeSearchResults(result));
      });
  };
}
