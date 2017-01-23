import React, {Component} from 'react';
import { connect } from 'react-redux';

import actions from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    changeStatusFrom: (status) => dispatch(actions.changeStatusFrom(status)),
  };
}

class Game extends Component {
  constructor() {
    super();

    this.state = {
      timer: 3,
    };

    this.tick = this.tick.bind(this);
    this.statusWillChange = this.statusWillChange.bind(this);
  }

  tick() {
    const newTimer = this.state.timer && (this.state.timer - 1);
    this.setState({ timer: newTimer });

    if (!newTimer) {
      this.props.changeStatusFrom(this.props.status);
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.statusWillChange(this.props.status);
  }

  componentWillReceiveProps({ status }) {
    if (status !== this.props.status) {
      this.statusWillChange(status);
    }
  }

  statusWillChange(status) {
    clearInterval(this.interval);
    switch (status) {
      case 'PLAYING.WARMUP':
        this.setState({ timer: 10 });
        break;
      case 'PLAYING.ANSWERING':
        this.setState({ timer: 120 });
        break;
      case 'PLAYING.VOTING':
        this.setState({ timer: 60 });
        break;
    }
    this.interval = setInterval(() => this.tick(), 1000);
  }

  render() {
    const { status, results } = this.props;
    const { timer } = this.state;

    const timerElement = timer > 0 ? (
      <div className="timer recording">{timer}</div>
    ) : <p>Time's up !</p>;

    return (
      <div className="Game">
        {(status === 'PLAYING.WARMUP' || status === 'PLAYING.ANSWERING') &&
          <div className="Ingame-container">
            <p>Hey, what are you waiting for?</p>
            {status === 'PLAYING.WARMUP' && <div>Feel free to try out your sounds for this round on your device!</div>}
            {status === 'PLAYING.ANSWERING' && <p>Now record your sounds on your device!</p>}
            {timerElement}
          </div>
        }
        {status === 'PLAYING.VOTING' &&
          <div className="Votes-container">
            <p>Now, time to vote!</p>
            {timerElement}
            <div className="Speaker">
              <div className="Speaker-icon"></div>
            </div>
            <div className="Speaker">
              <div className="Speaker-icon"></div>
            </div>
          </div>
        }
        {results ? 
          results.map(({ firstSentence, firstAnswer, secondSentence, secondAnswer }) => (
            <div>
              <span>{firstSentence}</span>
              <span>{secondSentence}</span>
            </div>
          ))
        : null}
      </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(Game);
