import { combineReducers } from 'redux';

// Reducers
import { routerReducer } from 'react-router-redux';
import { formReducer } from './form/reducers';
import { room } from './room/reducers';
import { rooms } from './rooms/reducers';
import { chat } from './chat/reducers';
import { playlists } from './playlists/reducers';
import { songs } from './songs/reducers';
import { searchSongs } from './search/reducers';
import { user } from './user/reducers';
import { queue } from './queue/reducers';
import { playing } from './playing/reducers';
import { misc } from './misc/reducers';

const rootReducer = combineReducers({
  user,
  room,
  rooms,
  chats: chat,
  playlists,
  playing,
  queue,
  songs,
  searchSongs,
  misc,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
