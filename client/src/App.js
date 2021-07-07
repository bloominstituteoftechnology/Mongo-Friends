import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Friends from './components/Friends';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Home} />
          <Route path="/friends" component={Friends} />
        </div>
      </Router>
    );
  }
}

export default App;
