import * as types from '../constants';
import auth from '../sagas/auth';

const initialState = {
  userId: '',
  username: '',
  email: '',
  token: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
