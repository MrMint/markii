import { combineReducers } from 'redux';

// Reducers
import { routeReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { rooms } from './rooms/reducers';
import { chat } from './chat/reducers';
import { playlists } from './playlists/reducers';
import { songs } from './songs/reducers';
import { searchSongs } from './search/reducers';
import { user } from './user/reducers';

const rootReducer = combineReducers({
  user,
  rooms,
  chats: chat,
  playlists,
  songs,
  searchSongs,
  routing: routeReducer,
  form: formReducer,
});

export default rootReducer;
