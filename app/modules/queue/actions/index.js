import {
  QUEUE_PUSH,
  QUEUE_POP,
  QUEUE_ENQUEUE,
} from '../constants';

export function popSong() {
  return {
    type: QUEUE_POP,
  };
}

export function pushSong(songId) {
  return {
    type: QUEUE_PUSH,
    payload: { songId },
  };
}

export function enqueueSong(songId) {
  return {
    type: QUEUE_PUSH,
    payload: { songId },
  };
}
