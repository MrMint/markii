import { combineReducers } from 'redux';

// Reducers
import { routeReducer } from 'redux-simple-router';
import { rooms } from './rooms/reducers';

const rootReducer = combineReducers({
  rooms,
  routing: routeReducer,
});

export default rootReducer;
