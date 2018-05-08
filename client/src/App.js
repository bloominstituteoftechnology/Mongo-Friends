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
      {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      {this.state.friendInfo.map(friend => {
        return (
          <div className = "buddy-card" key={friend.id}>
            <h2>Name: {friend.firstName} {friend.lastName}</h2>
            <h2>Age: {friend.age}</h2>
            {friend.contactInfo ? (
              <div><h3>Contact Info:</h3>
              <h4>Email: {friend.contactInfo.Email ? friend.contactInfo.Email : null}</h4>
              <h4>Phone Number: {friend.contactInfo.phoneNumber}</h4>
              <h4>Github Address: {friend.contactInfo.gitHub}</h4>
              <h4>User Name: {friend.contactInfo.userName}</h4>
              <h4>Facebook: {friend.contactInfo.facebook}</h4>
              <h4>Twitter: {friend.contactInfo.twitter}</h4></div> 
            ) : null}
          </div>
        )
      })}      
      </div>
    );
  }
}

export default App;
