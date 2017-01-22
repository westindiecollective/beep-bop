import React, { Component } from 'react';
import { connect } from 'react-redux';

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

function mapStateToProps({ sentence }) {
  return {
    sentence,
  };
}

class Game extends Component {
  render() {
    const { sentence } = this.props;

    return (
      <div className="Game">
        <div className="Situation">
          {sentence}
          <span className="Dialog-bg"></span>
        </div>
        <Keyboard url={urls[Math.floor(Math.random() * (urls.length - 1))]} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Game);
