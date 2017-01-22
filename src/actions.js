const { createAction } = require('redux-actions');

module.exports = {
  // CLIENT TO SERVER
  enterLobby: createAction('ENTER_LOBBY', (id, username) => ({ id, username, outgoing: true })),
  startGame: createAction('START_GAME', (id) => ({ id, outgoing: true })),
  firstAnswer: createAction('FIRST_ANSWER', (id, answer) => ({ id, answer })),
  secondAnswer: createAction('SECOND_ANSWER', (id, answer) => ({ id, answer })),

  // SERVER TO CLIENT
  setHost: createAction('SET_HOST', (dst) => ({ dst })),
  addedToLobby: createAction('ADDED_TO_LOBBY', (dst, role) => ({ dst, role })),
  syncPlayers: createAction('SYNC_PLAYERS', (dst, players) => ({ dst, players })),
  gameStarted: createAction('GAME_STARTED', (dst) => ({ dst })),
  firstSentence: createAction('FIRST_QUESTION', (dst, sentence) => ({ dst, sentence })),
  secondSentence: createAction('SECOND_QUESTION', (dst, sentence) => ({ dst, sentence })),

  // CLIENT

  // SERVER
  createLobby: createAction('CREATE_LOBBY', (key) => ({ key })),
  addPlayer: createAction('ADD_PLAYER', (key, username) => ({ key, username })),
};
