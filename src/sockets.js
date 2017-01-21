const actions = require('../src/actions');

const middleware = (options) => {
  const host = options.host || 'localhost';
  const port = options.port || 4000;

  return (store) => {
    const socket = new WebSocket(`ws://${host}:${port}/`);

    socket.on('open', function connection(ws) {
      // ws.send(action.helloClient(JSON.stringify({ id })));
    });

    socket.on('message', function incoming(message) {
      store.dispatch(JSON.parse(message));
    });

    return next => (action) => {
      if (!action.outgoing) {
        return next(action);
      }

      socket.send(JSON.stringify(action));
      return next();
    };
  };
};

module.exports = middleware;
