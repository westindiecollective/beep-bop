import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
const sagas = require('./sagas');
const createSocketMiddleware = require('./sockets');

import './index.css';

import App from './App';

const actions = require('./actions');

const defaultState = {
  uuid: undefined,
  username: undefined,
  role: undefined,
  theme: undefined,

  // HOST properties
  players: [],
};

const sagaMiddleware = createSagaMiddleware();
const socketMiddleware = createSocketMiddleware({ port: 4000 });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(
    sagaMiddleware,
    socketMiddleware
  ))
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
