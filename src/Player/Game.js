import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveAnswer } from '../actions';

import Keyboard from '../Keyboard/';

const urls = [
  'bark',
  'beep',
  'bell',
  'bing',
  'bong',
  'chime',
  'cow',
  'doorbell',
  'duck',
  'duck2',
  'grunt',
  'horse',
  'meow',
  'moose',
  'owl',
  'pingu',
  'sheep',
  'turkey'
].map(name => `${process.env.PUBLIC_URL}/sounds/${name}.mp3`);

function mapStateToProps({ sentence, status }) {
  return {
    sentence,
    status
  };
}

class Game extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.status === 'PLAYING.ANSWERING' && nextProps.status === 'PLAYING.COLLECTING') {
      const answer = this.keyboard.events;
      console.log(answer);
      this.props.dispatch(receiveAnswer(answer));
    }
  }

  render() {
    const { sentence, status } = this.props;
    console.log(status);
    return (
      <div className="Game">
        <div className="Situation">
          {sentence}
          <span className="Dialog-bg"></span>
        </div>
        {['PLAYING.WARMUP', 'PLAYING.ANSWERING'].includes(status) ? (
          <Keyboard
            url={urls[Math.floor(Math.random() * (urls.length - 1))]}
            recording={status === 'PLAYING.ANSWERING'}
            ref={node => this.keyboard = node}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Game);
