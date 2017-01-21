const { createAction } = require('redux-actions');

module.exports = {
  // CLIENT TO SERVER
  enterLobby: createAction('ENTER_LOBBY', (id, username) => ({ id, username, outgoing: true })),
  startGame: createAction('START_GAME', (id) => ({ id })),

  // SERVER TO CLIENT
  addedToLobby: createAction('ADDED_TO_LOBBY', (dst, role) => ({ dst, role })), 

  // CLIENT

  // SERVER
  createLobby: createAction('CREATE_LOBBY', (key) => ({ key })),
  addPlayer: createAction('ADD_PLAYER', (key, username) => ({ key, username })),
};
