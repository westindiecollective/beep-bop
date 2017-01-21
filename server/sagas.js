const { put, takeEvery } = require('redux-saga/effects');
const { enterLobby, startGame, createLobby } = require('../src/actions');

function* enterLobby(...args) {
  console.log(args);
  yield put({ type: 'INCREMENT' })
}

function* watchActions() {
  yield takeEvery('ENTER_LOBBY', enterLobby);
}

module.exports = watchActions;