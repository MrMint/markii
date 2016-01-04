import { combineReducers } from 'redux';

// Reducers
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { rooms } from './rooms/reducers';

const rootReducer = combineReducers({
  rooms,
  routing: routeReducer,
  form: formReducer,
});

export default rootReducer;
