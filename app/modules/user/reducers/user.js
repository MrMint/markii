import * as types from '../constants';

// const initialState = {
//   userId: '',
//   username: '',
//   email: '',
//   token: '',
// };

export default function user(state = {}, action) {
  switch (action.type) {
    case types.USER_SIGN_IN:
      return { username: 'asdf' };
    case types.USER_SIGN_OUT:
      return {};
    default:
      return state;
  }
}
