import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

import Game from './Game';

const mapStateToProps = ({ players, status, results }) => {
  return {
    players,
    status,
    results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class Host extends Component {
  componentDidMount() {
    const music = new Tone.Player({
      url: `${process.env.PUBLIC_URL}/sounds/main_menu.mp3`,
      autostart: true,
    }).toMaster();
  }

  render() {
    const { players, status, results } = this.props;

    if (status.startsWith('PLAYING')) {
      return <Game status={status} results={results} />;
    }

    return (
      <div className="Master">
        <p>Welcome to <span className="App-title">BeepBop</span> !<br/>{players.length? 'Here are the players today :': ''}</p>
        <div className="Players">
          {players.map(({ username, role }) => <span>{username}{role === 'master' && '🌟'}</span>)}
        </div>
        <p>Join now at this URL: <span className="App-location">{location.host}</span></p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);
