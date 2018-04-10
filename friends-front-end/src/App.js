import React, { Component } from 'react';
import './App.css';
import FriendsList from './components/friendsList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Beginning of NOTHING!</h1>
        <FriendsList />
      </div>
    );
  }
}

export default App;
