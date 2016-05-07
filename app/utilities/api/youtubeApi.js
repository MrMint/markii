import {
  YOUTUBE_API_KEY,
  YOUTUBE_SEARCH_URL,
} from './constants';
import { get, parseJson } from './apiUtils';
import uuid from 'uuid';
import { YOUTUBE } from '../../components/MediaPlayer/constants';
import { Song } from '../../modules/songs/types';

const parseSearchResults = (results) =>
  results.items.map(result =>
    new Song({
      id: uuid.v4(),
      name: result.snippet.title,
      source: YOUTUBE,
      sourceId: result.id.videoId,
      thumbnail: result.snippet.thumbnails.default.url,
    })
  );

export function search(query) {
  var url = `${YOUTUBE_SEARCH_URL}?part=snippet&q=${query}&maxResults=50&key=${YOUTUBE_API_KEY}`;
  return get(url, { key: YOUTUBE_API_KEY })
    .then(parseJson)
    .then(parseSearchResults);
}

// load api asynchronously
function loadApiInternal(url, cb) {
  // create script to be injected
  const api = document.createElement('script');

  // load async
  api.async = true;

  // set source to vendors api
  api.src = url;

  // append script to document head
  document.head.appendChild(api);

  // callback after loaded
  if (typeof cb === 'function') {
    cb();
  }
}

export function loadApi(cb) {
  loadApiInternal('//youtube.com/player_api', cb);
}
