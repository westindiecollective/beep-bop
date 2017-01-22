import React, { Component } from 'react';
import { connect } from 'react-redux';

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
