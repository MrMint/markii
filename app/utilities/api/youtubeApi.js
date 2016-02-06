import {
  YOUTUBE_API_KEY,
  YOUTUBE_SEARCH_URL,
} from './constants';
import { get, parseJson } from './apiUtils';
import uuid from 'uuid';
import { YOUTUBE } from '../../components/mediaPlayer/constants';

const parseSearchResults = (results) => {
  return results.items.map(result => {
    return {
      id: uuid.v4(),
      name: result.snippet.title,
      source: YOUTUBE,
      sourceId: result.id.videoId,
      thumbnail: result.snippet.thumbnails.default.url,
    };
  });
};

export function search(query) {
  var url = `${YOUTUBE_SEARCH_URL}?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}`;
  return get(url, { key: YOUTUBE_API_KEY })
    .then(parseJson)
    .then(parseSearchResults);
}
