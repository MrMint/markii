import R from 'ramda';

export const areSongsMediaEqual = R.curry((a, b) =>
  a.sourceId === b.sourceId && a.source === b.source
);

export const songsContainMedia = R.curry((mediaSource, sourceId, songs) => {
  var result = Boolean(
    R.find(
      areSongsMediaEqual({ sourceId, source: mediaSource })
    )(songs));
  return result;}
);
