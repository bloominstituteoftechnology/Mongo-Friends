import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { Route, Link } from "react-router-dom";
import FriendList from "./components/FriendList.js";
import Friend from "./components/Friend.js";

class App extends Component {
  constructor() {
    super() 
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/friends')
      .then(response => {
        this.setState({
          friends: response.data
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    const { friends } = this.state;
    return (
      <div className="App">
        <Link to="/">Home</Link>
        <Route exact path="/" render={props => <FriendList friends={friends}/>}/>
        <Route path="/friend/:id" render={({match}) => <Friend match={match}/>}/>
      </div>
    );
  }
}

export default App;
