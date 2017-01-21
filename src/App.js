import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import actions from './actions';

import Player from './Player/';
import Host from './Host/';

const mapStateToProps = ({ username }) => {
  return {
    username
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
    const theme = 'theme-t1';

    return (
      <div className={"App " + theme}>
        <div className="App-header">
          <div className="App-title">BeepBop.</div>
        </div>
        <div className="App-container">
        {
          username
            ? host
              ? <Host username={username} />
              : <Player username={username} />
            : <form onSubmit={this.handleSubmit.bind(this)}>
              <p>Welcome to <span className="App-title">BeepBop</span> !<br/><br/>Please enter your username</p>
              <div>
                  <input className="Username-prompt" type="text" placeholder="Jean-Michel Jam" name="username" maxLength="20" autoFocus />
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
