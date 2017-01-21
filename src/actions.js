const { createAction } = require('redux-actions');

module.exports = {
  // CLIENT TO SERVER
  enterLobby: createAction('ENTER_LOBBY', (id, username) => ({ id, username })),
  startGame: createAction('START_GAME', (id) => ({ id })),

  // SERVER TO CLIENT
  addedToLobby: createAction('ADDED_TO_LOBBY', (key, role) => ({ key, role })), 

  // CLIENT

  // SERVER
  createLobby: createAction('CREATE_LOBBY', (key, host_id ) => ({ key, host_id })),
};
