import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { handleActions } from 'redux-actions';
const createSagaMiddleware = require('redux-saga').default;

const sagas = require('./sagas');
const createSocketMiddleware = require('./sockets');

import './index.css';

import App from './App';

const actions = require('./actions');

const defaultState = {
  uuid: undefined,
};

const reducer = handleActions({
  HELLO_CLIENT: (state, { uuid }) => ({
    uuid,
  }),
}, defaultState);

const sagaMiddleware = createSagaMiddleware();
const socketMiddleware = createSocketMiddleware({ port: 4000 });

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, socketMiddleware)
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
