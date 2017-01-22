import React, { Component } from 'react';

import Game from './Game';

class Master extends Component {
  constructor() {
    super();

    this.state = {
      // LOBBY, PLAYING
      status: 'LOBBY',
    };
  }

  render() {
    const { status } = this.state;
    const code = 'GGJV';
    const players = [
      { username: 'Yoru' },
      { username: 'Feoche' },
      { username: 'Engleek' },
    ];

    if (status === 'PLAYING') {
      return <Game />;
    }

    return (
      <div className="Master">
        <h2>Players</h2>
        <div className="Players">
          {players.map(({ username }) => <span>{username}</span>)}
        </div>
        {players.length > 2 && (
              <button onClick={() => this.setState({ status: 'PLAYING' })}>
                Start now!
              </button>
            )}
      </div>
    );
  }
}

export default Master;
