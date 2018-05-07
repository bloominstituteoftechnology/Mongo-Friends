import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            friends: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/friends')
            .then(friend => {
                this.setState({friends: friend.data})
            })
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <ul>
              {this.state.friends.map((friend) => {
                  return <li>{`${friend.firstName} ${friend.lastName}`}</li>
              })}
          </ul>
      </div>
    );
  }
}

export default App;
