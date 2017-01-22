const { combineReducers } =  require('redux');

const host = (state = null, action) => (action.type === 'CREATE_LOBBY') ? action.payload.key : state;

const status = (state = 'LOBBY', action) => {
  if (action.type === 'CHANGE_STATUS_FROM') {
    if (action.status === 'LOBBY') return 'PLAYING.WARMUP';
    if (action.status === 'PLAYING.WARMUP') return 'PLAYING.ANSWERING';
    if (action.status === 'PLAYING.ANSWERING') return 'PLAYING.VOTING';
    if (action.status === 'PLAYING.VOTING') return 'PLAYING.WARMUP';
  }

  if (action.type === 'START_GAME') {
    return 'PLAYING.WARMUP';
  }

  return state;
};

const players = (state = {}, action) => {
  if (action.type === 'ADD_PLAYER') {
    return Object.assign({}, state, { [action.payload.key]: {
      username: action.payload.username,
      key: action.payload.key,
    }});
  }

  let newstate = {};
  let stateHasChanged = false;
  Object.keys(state).forEach(key => {
    newstate[key] = playerReducer(state[key], action);
    if (newstate[key] !== state[key]) {
      stateHasChanged = true;
    }
  });

  return stateHasChanged ? newstate : state;
};

const playerReducer = (state = {}, action) => {
  if (action.type === 'ADDED_TO_LOBBY' && action.payload.dst === state.key) {
    return Object.assign({}, state, {
      role: action.payload.role,
    });
  }

  return state;
}

const rootReducer = combineReducers({
  status,
  host,
  players,
});

module.exports = rootReducer;