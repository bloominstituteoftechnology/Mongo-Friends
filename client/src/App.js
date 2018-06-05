import React, { Component } from 'react';

import Friends from './components/Friends/Friends';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <Friends />
          
      </div>
    );
  }
}

export default App;
