import * as types from '../constants';

const initialState = {
  userId: '',
  username: '',
  email: '',
  token: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.USER_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
