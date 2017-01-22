import { combineReducers } from 'redux';

const playersReducers = (state = [], { type, payload }) => {
  if (type === 'SYNC_PLAYERS') {
    return payload.players;
  }

  return state;
}

export default combineReducers({
  players: playersReducers,
  username: (state = null, action) => {
    switch (action.type) {
      case 'ENTER_LOBBY':
        return action.payload.username;
      case 'SET_HOST':
        return 'host';
    }

    return state;
  },
  role: (state = null, action) => {
    switch (action.type) {
      case 'ADDED_TO_LOBBY':
        return action.payload.role;
      case 'SET_HOST':
        return 'host';
    }

    return state;
  },
  theme: (state = null, action) => action.type === 'ADDED_TO_LOBBY' || action.type === 'SET_HOST' ? parseInt(Math.random() * 140) : state,
});