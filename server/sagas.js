const { put, takeEvery, select } = require('redux-saga/effects');
const { addPlayer, addedToLobby, updatePlayers } = require('../src/actions');

function* enterLobby({ payload, meta }) {
  const players = yield select(state => state.players);

  const { key } = meta;

  yield put(addPlayer(key, payload.username));
  if (!Object.keys(players).length) {
    yield put(addedToLobby(key, 'master'));
  } else {
    yield put(addedToLobby(key, 'player'));
  }
}

function* updatePlayerList() {
  const host = yield select(state => state.host);
  const players = yield select(state => Object.values(state.players));

  yield put(updatePlayers(host, players));
}

function* watchActions() {
  yield takeEvery('ENTER_LOBBY', enterLobby);
  yield takeEvery('ADDED_TO_LOBBY', updatePlayerList);
}

module.exports = watchActions;