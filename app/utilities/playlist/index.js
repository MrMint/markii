import R from 'ramda';
import { songsContainMedia } from '../song';

export function playlistContainsMedia(mediaSource, sourceId, playlist, songs) {
  return songsContainMedia(
    mediaSource,
    sourceId,
    R.map(songIndex => songs[songIndex])(playlist.songs)
  );
}
