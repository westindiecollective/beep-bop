import React, { Component } from 'react';

import Keyboard from '../Keyboard/';

const urls = [
  'tiger',
  'cow',
  'duck2',
  'horse',
  'sheep',
  'tiger',
  'bing',
  'bong',
].map(name => `${process.env.PUBLIC_URL}/sounds/${name}.mp3`);

class Game extends Component {
  render() {
    return (
      <div className="Game">
        <div className="Situation">
          Test
          <span className="Dialog-bg"></span>
        </div>
        <Keyboard url={urls[Math.floor(Math.random() * (urls.length - 1))]} />
      </div>
    );
  }
}

export default Game;
