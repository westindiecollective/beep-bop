import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
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
  username: undefined,
  role: undefined,
};

const reducer = handleActions({
  ENTER_LOBBY: (state, { payload: { username } }) => ({
    ...state,
    username,
  }),
  ADDED_TO_LOBBY: (state, { payload: { role } }) => ({
    ...state,
    role,
    theme: parseInt(Math.random() * 140),
  }),
}, defaultState);

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
