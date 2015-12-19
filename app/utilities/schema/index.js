
import { Schema, arrayOf } from 'normalizr';

const user = new Schema('users');
const room = new Schema('rooms');
const playlist = new Schema('playlists');
const song = new Schema('songs');

room.define({
  currentDj: user,
  participants: arrayOf(user),
  waitlist: arrayOf(user),
});

playlist.define({
  songs: arrayOf(song),
});
