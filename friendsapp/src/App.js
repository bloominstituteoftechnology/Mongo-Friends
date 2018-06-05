import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/Friend/Friend.css'
import Friend from './components/Friend/Friend';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Friends App</h1>
        </header>
        <Friend className="Friend-card"/>
      </div>
    );
  }
}

export default App;
