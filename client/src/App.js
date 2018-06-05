import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import FriendsList from "./components/FriendsList";
import FriendFrom from "./components/FriendForm";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ShowFriend from "./components/ShowFriend";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/friends")
      .then(friends => {
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
        <Router>
          <div>
            <Route path="/" exact render={() => <FriendsList friends={this.state.friends} />} />
            <Route path="/addfriends/new" exact render={() => <FriendFrom addFriend={this.addFriend}/>} />
            <Route path="/friends/:id" component={ShowFriend}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;



