import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

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
        {this.state.friends.map(friend => {
          return <div>
          <p> {friend.firstName} </p>
          <p> {friend.lastName} </p>
          <p> {friend.age} </p>
          {console.log(friend.contactInfo, "here")}
          {friend.contactInfo.length > 0 &&
          <div>
        <p>
           {friend.contactInfo[0].email}
        </p>
        <p>
           {friend.contactInfo[0].mobileNumber}
        </p>
        <p>
           {friend.contactInfo[0].githubUsername}
        </p>
        <p>
           {friend.contactInfo[0].facebookUsername}
        </p>
        <p>
           {friend.contactInfo[0].twitterHandle}
        </p>
        </div>
      }
          </div>
        })}
      </div>
    );
  }
}

export default App;
