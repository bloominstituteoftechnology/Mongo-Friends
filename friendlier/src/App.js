import React, { Component } from 'react';
import './App.css';
import Friends from './components/friendList.js';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <Friends />
      </div>
    );
  }
}

export default App;
