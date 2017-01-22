import React, {Component} from 'react';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      timer: 90
    };
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({ timer: this.state.timer && (this.state.timer - 1) });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  render() {
    return (
      <div className="Game">
        <div className="Ingame-container">
          {this.state.timer && <p>Hey, what are you waiting for?</p>}
          {this.state.timer > 70 ? <div>Feel free to try out your sounds for this round on your device!<br/><div className="timer">{this.state.timer}</div></div> : this.state.timer? (<div><p>Now record your sounds on your device!</p><div className="timer recording">{this.state.timer}</div></div>) : (<p>Time's up !</p>)}
        </div>
        <div className="Votes-container">
          {/* for each situation, repeat that */}
        </div>
      </div>
    );
  }
}

export default Game;
