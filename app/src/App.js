import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      friends: []
     }
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/friends`)
      .then(response => {
        this.setState(() => ({ friends: response.data }));
      })
      .catch(err => {
        console.error('Server error', err);
      })
  }

  render() {
    const { friends } = this.state
    console.log(friends);
    return (
      <div className="App">
        <div className="friend-container">
          {friends && friends.map(friend =>
            <div className='friend-card' key={friend._id}>
              <h2>{friend.firstName + " " + friend.lastName}</h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
