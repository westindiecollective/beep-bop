const { delay } = require('redux-saga');
const { put, takeEvery } = require('redux-saga/effects');

function* helloServer() {
  yield delay(1000)
  console.log('HELLO!');
  yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() {
  yield takeEvery('HELLO_SERVER', helloServer);
}

module.exports = watchIncrementAsync;