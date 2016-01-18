import { call, take, put, race, fork } from 'redux-saga';
import { authentication } from './user/sagas/auth';


export default function* root() {
  yield fork(authentication);
}
