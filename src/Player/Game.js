import React, { Component } from 'react';

import Keyboard from '../Keyboard/';

class Game extends Component {
  render() {
    return (
      <div className="Game">
        <div className="Situation">
          Test
          <span className="Dialog-bg"></span>
        </div>
        <Keyboard url={`${process.env.PUBLIC_URL}/sounds/duck2.mp3`} />
      </div>
    );
  }
}

export default Game;
