import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import FriendsList from "./components/FriendsList";
import FriendFrom from "./components/FriendForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/friends")
      .then(friends => {
        console.log(friends);
        this.setState({...this.state, friends: friends.data});
      })
      .catch(err => {
        console.log(err);
      })
  }

  addFriend = (newFriend) => {
    axios.post("http://localhost:5000/api/friends", newFriend)
      .then(addFriend => {
        let newArray = [...this.state.friends];
        newArray.push(newFriend);
        this.setState({...this.state, friends: newArray})
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
        <FriendFrom addFriend={this.addFriend}/>
        <div>
          <FriendsList friends={this.state.friends} />
        </div>
      </div>
    );
  }
}

export default App;



