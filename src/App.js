import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Player from './Player/';
import Master from './Master/';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { username } = this.state;
    const master = false;

    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <div className="App-title">BeepBop.</div>
        </div>
        <div className="App-container">
        {
          username
            ? master
              ? <Master username={username} />
              : <Player username={username} />
            : <form
              onSubmit={e => {
                  this.setState({ username: e.target['username'].value });

                  e.preventDefault();
                  return false;
                }}
            >
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

export default App;
