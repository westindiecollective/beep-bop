import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from './Game';
import actions from '../actions';

function mapStateToProps({ status }) {
  return {
    status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startGame: () => dispatch(actions.startGame()),
  };
}

class Player extends Component {
  render() {
    const { username, role, status, startGame } = this.props;

    if (status === 'PLAYING') {
      return <Game/>;
    }

    return (
      <div className="Player">
        <h2>Hello <span className="username">{username}</span>!</h2>
        {role === 'player' && <p>Wait for the master to start the game!</p>}
        {role === 'master' && <button onClick={startGame}>Launch game!</button>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
