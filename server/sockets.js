const WebSocket = require('ws');
const uuid = require('node-uuid');

const actions = require('../src/actions');

const middleware = (options) => {
  const port = options.port || 4000;

  const sockets = {};

  return (store) => {
    const wss = new WebSocket.Server({ port });

    wss.on('connection', function connection(ws) {
      const id = uuid.v4();

      sockets[id] = id;

      ws.send(action.helloClient(JSON.stringify({ id })));

      ws.on('message', function incoming(message) {
        store.dispatch(JSON.parse(message));
      });
    });

    return next => (action) => {
      if (!action.dst) {
        return next(action);
      }

      sockets[action.dst].send(JSON.stringify(action));
      return next();
    };
  };
};

module.exports = middleware;
