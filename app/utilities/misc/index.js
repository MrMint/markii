import R from 'ramda';

export const overlaps = R.pipe(R.intersection, R.complement(R.isEmpty));

export const formatSecondsAsMinutes = (seconds) => {
  const minutes = `0${Math.round(Math.floor(seconds / 60))}`;
  const sec = `0${Math.round(seconds - minutes * 60)}`;
  return `${minutes.substr(-2)}:${sec.substr(-2)}`;
};
