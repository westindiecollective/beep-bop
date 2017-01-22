const { put, take, takeEvery, takeLatest, select } = require('redux-saga/effects');
const { addPlayer, addedToLobby, syncPlayers, gameStarted, firstQuestion, secondQuestion } = require('../src/actions');

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

  const randomizedSentences = shuffle(sentences).slice(0, players.length - 1);
  const round = players.map((id, index) => ({
    id,
    firstSentence: randomizedSentences[index % sentences.length],
    firstAnswer: null,
    secondSentence: randomizedSentences[(index + 1) % sentences.length],
    secondAnswer: null,
  }));

  yield round.forEach(({ id, firstSentence }) => put(firstQuestion(id, firstSentence )));

  while (round.filter(player => player.firstAnswer === null).length > 0) {
    const { id, answer } =  take('FIRST_ANSWER');
    round.find(player => player.id === id).firstAnswer = answer;
  }

  yield round.forEach(({ id, secondSentence }) => put(secondQuestion(id, secondSentence )));

  while (round.filter(player => player.secondAnswer === null).length > 0) {
    const { id, answer } =  take('SECOND_ANSWER');
    round.find(player => player.id === id).secondAnswer = answer;
  }
}

function* watchActions() {
  yield takeEvery('ENTER_LOBBY', enterLobby);
  yield takeEvery('ADDED_TO_LOBBY', updatePlayerList);
  yield takeLatest('START_GAME', startGame);
}

module.exports = watchActions;