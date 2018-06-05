import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { Route } from "react-router-dom";
import FriendList from "./components/FriendList.js";

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
    return (
      <div className="App">
        <Route exact path="/" render={props => <FriendList friends={this.state.friends}/>}/>
      </div>
    );
  }
}

export default App;
