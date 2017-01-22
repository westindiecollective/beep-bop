import React, { Component } from 'react';

import Game from './Game';

class Player extends Component {
  constructor() {
    super();

    this.state = {
      // LOBBY, PLAYING
      status: 'LOBBY',
    };
  }

  render() {
    const { status } = this.state;
    const { username, role } = this.props;

    if (status === 'PLAYING') {
      return <Game/>;
    }

    return (
      <div className="Player">
        <h2>Hello <span className="username">{username}</span>!</h2>
        {role === 'player' && <p>Wait for the master to start the game!</p>}
        {role === 'master' && <button>Launch game!</button>}
      </div>
    );
  }
}

export default Player;
