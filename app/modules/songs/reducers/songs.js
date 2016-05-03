import * as types from '../constants';
import * as sources from '../../../components/MediaPlayer/constants';
const initialState = new Map();
const song = {
    id: '0f17d275-3dd7-4311-bba1-75918fc8f001',
    name: 'Best of Miku 2015',
    source: sources.YOUTUBE,
    sourceId: 'cVYvozAWPtc',
};
initialState.set(song.id, song);

export default function songs(state = initialState, action) {
  switch (action.type) {
    case types.SONG_ADD:
      return [...state, action.payload.song];
    case types.SONG_ADD_SONGS:
      return [...state, ...action.payload.songs];
    default:
      return state;
  }
}
