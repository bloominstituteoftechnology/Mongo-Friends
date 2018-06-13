import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import FriendList from './components/FriendList';
import AddFriend from './components/AddFriend';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [{}]
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:5000/api/friends')
      .then(res => {
        // console.log('data: ', res.data)
        this.setState({ friends: res.data.friends})
      })
      .catch(error => {
        console.log(error);
      })
  }

  addFriend = (newFriend) => {
    axios
      .post('http://localhost:5000/api/friends', newFriend)
      .then(addFriend => {
        let friendCollection = [...this.state.friends];
        friendCollection.push(newFriend);
        this.setState({ ...this.state, friends: friendCollection })
      })
  }

  render() {
    return (
      <div className="App">
      <div>
        Doraemon's Land
      </div>
      <div>
        <AddFriend addFriend={this.addFriend}/>
        <FriendList friends={this.state.friends}/>
        </div>
      </div>
    );
  }
}

export default App;
