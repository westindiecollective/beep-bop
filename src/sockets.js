const actions = require('../src/actions');

const middleware = options => {
  const host = options.host || 'localhost';
  const port = options.port || 4000;

  return store => {
    const socket = new WebSocket(`ws://${host}:${port}/`);

    socket.addEventListener('message', function incoming(message) {
      store.dispatch(JSON.parse(message.data));
    });

    return next => action => {
      if (action.payload.outgoing) {
        socket.send(JSON.stringify(action));
      }

      return next(action);
    };
  };
};

module.exports = middleware;
