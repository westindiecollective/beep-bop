import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { handleActions } from 'redux-actions';
import createSagaMiddleware from 'redux-saga';

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
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
