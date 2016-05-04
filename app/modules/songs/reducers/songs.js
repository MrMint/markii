import * as types from '../constants';
import * as sources from '../../../components/MediaPlayer/constants';
import { Map } from 'immutable';
import { Song } from '../types';

const song = new Song({
    id: '0f17d275-3dd7-4311-bba1-75918fc8f001',
    name: 'Best of Miku 2015',
    source: sources.YOUTUBE,
    sourceId: 'cVYvozAWPtc',
});

const initialState = Map([[song.id, song]]);

export default function songs(state = initialState, action) {
  switch (action.type) {
    case types.SONG_ADD:
      const { song } = action.payload;
      return state.set(song.id, song);
    case types.SONG_ADD_SONGS:
      const { songs } = action.payload;
      return state.merge(songs.map(song => [song.id, song]));
    default:
      return state;
  }
}
