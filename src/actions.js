const { createAction } = require('redux-actions');

module.exports = {
  helloServer: createAction('HELLO_SERVER', username => username),
  helloClient: createAction('HELLO_CLIENT', uuid => uuid),
};
