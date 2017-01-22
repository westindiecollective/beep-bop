const { combineReducers } =  require('redux');

const host = (state = null, action) => (action.type === 'CREATE_LOBBY') ? action.payload.key : state;

const players = (state = {}, action) => {
  if (action.type === 'ADD_PLAYER') {
    return Object.assign(state, { [action.payload.key]: {
      username: action.payload.username,
    }});
  }

  return state;
};

const rootReducer = combineReducers({
  host,
  players,
});

module.exports = rootReducer;