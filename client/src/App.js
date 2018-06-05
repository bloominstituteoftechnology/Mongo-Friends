import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import FriendsCards from './components/FriendsCards/FriendsCards.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/friends`)
      .then((response) => {
        console.log(response.data);
        this.setState({ friends: response.data});
        console.log(this.state.friends);
      })
      .catch(err => {
        console.log(err);
      })

  }

  render() {
    return (
      <div className="App">
        <FriendsCards friends={this.state.friends}/>
      </div>
    );
  }
}

export default App;
