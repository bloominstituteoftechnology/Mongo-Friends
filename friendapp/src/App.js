import React, { Component } from 'react';

import FriendList from './FriendList';
import FriendForm from './FriendForm';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <FriendList />
        <FriendForm />
      </div>
    );
  }
}

export default App;
