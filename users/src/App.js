import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import FriendForm from './components/friendForm';
import Friends from './components/friends';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }
  componentDidMount() {
    this.getFriends();
  }

  addFriendsOnCreate = friends => {
    this.setState({ friends });
  }

  getFriends = () => {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        this.setState({ friends: res.data });
      })
      .catch(error => {
        console.log(`There was an error getting friends: ${error}`);
      });
  };

  deleteFriend = id => {
    axios
    .delete(`http://localhost:3333/smurfs/${id}`)
    .then(response => {
      this.getFriends();
    })
    .catch(err => {
      console.log(err);
    });
  };


  render() {
    const { friends } = this.state;
    return (
      <div className="App">
          <FriendForm addFriendsOnCreate={this.addFriendsOnCreate} />
          <Friends deleteFriend={this.deleteFriend} friends={friends} />
      </div>
    );
  }
}

export default App;
