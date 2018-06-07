import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= { 
      friendInfo: []
    }
  }

componentDidMount() {
  this.getFriends();
}
getFriends = () => {
  axios
  .get(`http://localhost:5000/api/friends`)
  .then(response => {
    this.setState({ friendInfo: response.data })
  })
  .catch(err => {
    console.log(err);
  });
}

  render() {
    return (
      <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Friend List</h1>
        </header>
      {this.state.friendInfo.map(friend => {
        return (
          <div className = "buddy-card" key={friend.id}>
            <p className="name"><b>Name:</b> {friend.firstName} {friend.lastName}</p>
            <p className="age"><b>Age:</b> {friend.age}</p>
            {friend.contactInfo ? (
              <div><h3>Contact Info:</h3>
              <p className="email"><b>Email:</b> {friend.contactInfo.Email ? friend.contactInfo.Email : null}</p>
              <p className="phone"><b>Phone Number:</b> {friend.contactInfo.phoneNumber}</p>
              <p className="github"><b>Github Address:</b> {friend.contactInfo.gitHub}</p>
              <p className="user"><b>User Name:</b> {friend.contactInfo.userName}</p>
              <p className="facebook"><b>Facebook:</b> {friend.contactInfo.facebook}</p>
              <p className="twitter"><b>Twitter:</b> {friend.contactInfo.twitter}</p></div> 
            ) : null}
          </div>
        )
      })}      
      </div>
    );
  }
}

export default App;
