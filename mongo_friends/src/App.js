import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg'
import './App.css';



class App extends Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    this.getFriends();
  }

  getFriends = () => {
    axios
      .get("http://localhost:5000/api/friends")
      .then(response => {
        this.setState({ friends: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Mongo Friends</h1>
        </header>
        <ul>
          {this.state.friends.map(friend => {
            return (
              <div>
                <li key={friend.id} className="friend"> </li>
                <li className="name">{friend.firstName}</li>
                <li className="name">{friend.lastName}</li>
                <li className="age">{`Age:${friend.age}`}</li>
              </div>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
