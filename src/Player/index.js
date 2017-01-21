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
    const { username } = this.props;

    if (status === 'PLAYING') {
      return <Game />;
    }

    return (
      <div className="Master">
        <h2>Hello {username}!</h2>
        <p>Wait for the master to start the game!</p>
      </div>
    );
  }
}

export default Player;
