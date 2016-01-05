import { combineReducers } from 'redux';

// Reducers
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { rooms } from './rooms/reducers';
import { chat } from './chat/reducers';

const rootReducer = combineReducers({
  rooms,
  chats: chat,
  routing: routeReducer,
  form: formReducer,
});

export default rootReducer;
