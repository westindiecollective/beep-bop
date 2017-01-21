const { put, takeEvery, select } = require('redux-saga/effects');
const { createLobby, addPlayer, addedToLobby } = require('../src/actions');

function* enterLobby({ payload, meta }) {
  const host = yield select(state => state.host);
  const players = yield select(state => state.players);

  const { key } = meta;

  if (!host) {
    yield put(createLobby(key));
    yield put(addedToLobby(key, 'host'));
  } else {
    yield put(addPlayer(key, payload.username));
    if (!Object.keys(players).length) {
      yield put(addedToLobby(key, 'master'));
    } else {
      yield put(addedToLobby(key, 'player'));
    }
  }
}

function* watchActions() {
  yield takeEvery('ENTER_LOBBY', enterLobby);
}

module.exports = watchActions;