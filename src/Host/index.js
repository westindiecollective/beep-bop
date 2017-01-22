import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from './Game';

const mapStateToProps = ({ players }) => {
  return {
    players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class Master extends Component {
  constructor() {
    super();

    this.state = {
      // LOBBY, PLAYING
      status: 'LOBBY',
    };
  }

  render() {
    const { players } = this.props;
    const { status } = this.state;

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

export default connect(mapStateToProps, mapDispatchToProps)(Master);
