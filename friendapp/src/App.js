import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import { FriendsMap } from './components/FriendsMap';
import NewFriend from './components/NewFriend';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/friends`)
    .then(res => {
      this.setState({ friends: res.data })
      console.log(this.state.friends);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <NewFriend />
        {this.state.friends.map((friend) => {
          return <div key={friend._id}>
           <FriendsMap friend={friend}/>
          </div>
        })}
      </div>
    );
  }
}

export default App;
