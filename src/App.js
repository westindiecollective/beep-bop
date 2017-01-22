import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import actions from './actions';

import Player from './Player/';
import Host from './Host/';

const mapStateToProps = ({ username, role, theme }) => {
  return {
    username,
    role,
    theme,
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
    const { username, role, theme } = this.props;

    return (
      <div className={theme ? `App theme-t${theme}` : 'App'}>
        <div className="App-header">
          <div className="App-title">BeepBop.</div>
        </div>
        <div className="App-container">
        {/*role === 'master' && <Master username={username} />*/}
        {role === 'host' && <Host username={username} />}
        {role === 'player' && <Player username={username} />}
        {!username &&
          <form onSubmit={this.handleSubmit.bind(this)}>
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
