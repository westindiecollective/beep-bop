const WebSocket = require('ws');
const uuid = require('node-uuid');

const actions = require('../src/actions');

const middleware = (options) => {
  const port = options.port || 4000;

  const sockets = {};

  return (store) => {
    const wss = new WebSocket.Server({ port });

    wss.on('connection', function connection(ws) {
      const key = ws.upgradeReq.headers['sec-websocket-key'];

      sockets[key] = key;

      ws.on('message', function incoming(message) {
        const action = JSON.parse(message);
        action.meta = { key };
        console.log(action);
        store.dispatch(action);
      });
    });

    return next => (action) => {
      if (!action.dst) {
        return next(action);
      }

      sockets[action.dst].send(JSON.stringify(action));
      return;
    };
  };
};

module.exports = middleware;
