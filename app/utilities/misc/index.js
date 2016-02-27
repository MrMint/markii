import R from 'ramda';

export const overlaps = R.pipe(R.intersection, R.complement(R.isEmpty));
