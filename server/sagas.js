const { put, takeEvery, takeLatest, select } = require('redux-saga/effects');
const { addPlayer, addedToLobby, syncPlayers, gameStarted } = require('../src/actions');

function* enterLobby({ payload, meta }) {
  const players = yield select(state => state.players);

  const { key } = meta;
  const isLobbyEmpty = !Object.keys(players).length;

  yield put(addPlayer(key, payload.username));
  if (isLobbyEmpty) {
    yield put(addedToLobby(key, 'master'));
  } else {
    yield put(addedToLobby(key, 'player'));
  }
}

function* updatePlayerList() {
  const host = yield select(state => state.host);
  const players = yield select(state => Object.keys(state.players).map(key => state.players[key]));

  yield put(syncPlayers(host, players));
}

function* startGame() {
  const host = yield select(state => state.host);
  const players = yield select(state => Object.keys(state.players));

  yield [].concat([host], players).map((key) => put(gameStarted(key)));
}

function* watchActions() {
  yield takeEvery('ENTER_LOBBY', enterLobby);
  yield takeEvery('ADDED_TO_LOBBY', updatePlayerList);
  yield takeLatest('START_GAME', startGame);
}

module.exports = watchActions;