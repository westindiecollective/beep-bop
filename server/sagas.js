const { put, take, takeEvery, takeLatest, select } = require('redux-saga/effects');
const { addPlayer, addedToLobby, syncPlayers, gameStarted, sendSentence, updateStatus } = require('../src/actions');

// Fisher-Yates shuffle
function shuffle(array) {
  let arrayCopy = array.slice();
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }

  return arrayCopy;
}

const sentences = require('../src/sentences.json');

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

  // wait here for CHANGE_STATUS_FROM, PLAYING.WARMUP -> PLAYING.ANSWERING ?

  const randomizedSentences = shuffle(sentences).slice(0, players.length);
  const round = players.map((id, index) => ({
    id,
    firstSentence: randomizedSentences[index % sentences.length],
    firstAnswer: null,
    secondSentence: randomizedSentences[(index + 1) % sentences.length],
    secondAnswer: null,
  }));

  yield round.map(({ id, firstSentence }) => put(sendSentence(id, firstSentence )));

  // while (round.filter(player => player.firstAnswer === null).length > 0) {
  //   const { id, answer } =  take('RECEIVE_ANSWER');
  //   round.find(player => player.id === id).firstAnswer = answer;
  // }

  // yield round.map(({ id, secondSentence }) => put(sendSentence(id, secondSentence )));

  // while (round.filter(player => player.secondAnswer === null).length > 0) {
  //   const { id, answer } =  take('RECEIVE_ANSWER');
  //   round.find(player => player.id === id).secondAnswer = answer;
  // }
}

function* changeStatus({ payload }) {
  const host = yield select(state => state.host);
  const players = yield select(state => Object.keys(state.players));

  // reducer or saga, that is the question, sorry DRY, time's running out
  let nextStatus = 'LOBBY';
  if (payload.status === 'LOBBY') nextStatus = 'PLAYING.WARMUP';
  if (payload.status === 'PLAYING.WARMUP') nextStatus = 'PLAYING.ANSWERING';
  if (payload.status === 'PLAYING.ANSWERING') nextStatus = 'PLAYING.VOTING';
  if (payload.status === 'PLAYING.VOTING') nextStatus = 'PLAYING.WARMUP';

  yield [].concat([host], players).map((key) => put(updateStatus(key, nextStatus)));
}

function* watchActions() {
  yield takeEvery('ENTER_LOBBY', enterLobby);
  yield takeEvery('ADDED_TO_LOBBY', updatePlayerList);
  yield takeLatest('START_GAME', startGame);
  yield takeLatest('CHANGE_STATUS_FROM', changeStatus);
}

module.exports = watchActions;