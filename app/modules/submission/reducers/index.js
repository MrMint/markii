import * as types from '../constants';

export function submission(state = {}, action) {
  switch (action.type) {
    case types.SHOW:
      return {
        shown: true,
        results: action.results,
      };
    case types.HIDE:
      return {};
    default:
      return state;
  }
}
