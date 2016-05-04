import { Record, List } from 'immutable';

export const Playlist = new Record({
  id: '',
  name: '',
  songs: new List(),
});
