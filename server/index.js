const { createStore, applyMiddleware } = require('redux');
const { handleActions } = require('redux-actions');
const createSagaMiddleware = require('redux-saga').default;

const actions = require('../src/actions');
const reducers = require('./reducers');
const sagas = require('./sagas');
const createSocketMiddleware = require('./sockets');

const sagaMiddleware = createSagaMiddleware();
const socketMiddleware = createSocketMiddleware({ port: 4000 });

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, socketMiddleware)
);

sagaMiddleware.run(sagas)

console.log('Server running…');
