const { createStore, applyMiddleware } = require('redux');
const { handleActions } = require('redux-actions');
const createSagaMiddleware = require('redux-saga').default;

const actions = require('../src/actions');
const sagas = require('./sagas');
const createSocketMiddleware = require('./sockets');

const defaultState = {
  host: undefined,
};

const reducer = handleActions({
  HELLO_SERVER: (state, action) => ({
      host: uuid,
  }),
}, defaultState);

const sagaMiddleware = createSagaMiddleware();
const socketMiddleware = createSocketMiddleware({ port: 4000 });

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, socketMiddleware)
);

sagaMiddleware.run(sagas)

console.log('Server running…');
