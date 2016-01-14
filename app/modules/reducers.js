import { combineReducers } from 'redux';

// Reducers
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { rooms } from './rooms/reducers';
import { chat } from './chat/reducers';
import { playlists } from './playlists/reducers';
import { songs } from './songs/reducers';
import { searchSongs } from './search/reducers';

const rootReducer = combineReducers({
  rooms,
  chats: chat,
  playlists,
  songs,
  searchSongs,
  routing: routeReducer,
  form: formReducer,
});

export default rootReducer;
