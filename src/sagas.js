const { delay } = require('redux-saga');
const { put, takeEvery } = require('redux-saga/effects');

function* helloClient() {
  yield delay(1000)
  console.log('HELLO!');
  yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() {
  yield takeEvery('HELLO_CLIENT', helloClient);
}

module.exports = watchIncrementAsync;