import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    friends: []
  }
  componentDidMount() {
    this.getFriends()
  }

  getFriends = () => {
    axios.get('http://localhost:5000/api/friends')
    .then(res => {
      this.setState({ friends: res.data })
    });
  }

  render() {
    return (
      <div className="App">
      {this.state.friends.map(friend => <div>{friend.firstName}</div>)}
      </div>
    );
  }
}

export default App;
