import { combineReducers } from 'redux';

// Reducers
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { rooms } from './rooms/reducers';
import { chat } from './chat/reducers';
import { playlists } from './playlists/reducers';

const rootReducer = combineReducers({
  rooms,
  chats: chat,
  playlists,
  routing: routeReducer,
  form: formReducer,
});

export default rootReducer;
