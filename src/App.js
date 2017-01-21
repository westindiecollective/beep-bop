import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import actions from './actions';

import Player from './Player/';
import Host from './Host/';

const mapStateToProps = ({ username }) => {
  return {
    username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enterLobby: username => dispatch(actions.enterLobby(null, username)),
  };
};

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();
    
    this.props.enterLobby(e.target['username'].value);
  }

  render() {
    const { username } = this.props;
    const host = false;

    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <div className="App-title">BeepBop.</div>
        </div>
        <div className="App-container">
        {
          username
            ? host
              ? <Host username={username} />
              : <Player username={username} />
            : <form onSubmit={this.handleSubmit.bind(this)}>
              <p>Please enter your username</p>
              <div>
              <input type="text" placeholder="Jean-Michel Jam" name="username" maxLength="20" autoFocus />
              <button>Play!</button>
              </div>
            </form>
        }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
