import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

import Game from './Game';

const mapStateToProps = ({ players, status }) => {
  return {
    players,
    status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const music = new Tone.Player({
  url: `${process.env.PUBLIC_URL}/sounds/main_menu.mp3`,
  autostart: true,
}).toMaster();

music.start();

class Host extends Component {
  render() {
    const { players, status } = this.props;

    if (status === 'PLAYING') {
      return <Game />;
    }

    return (
      <div className="Master">
        <h2>Players</h2>
        <div className="Players">
          {players.map(({ username, role }) => <span>{username}{role === 'master' && '🌟'}</span>)}
        </div>
        <p>Join now at this URL: {location.host}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);
