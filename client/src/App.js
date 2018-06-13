import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import FriendList from './components/FriendList';

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


  render() {
    return (
      <div className="App">
        <FriendList friends={this.state.friends}/>
      </div>
    );
  }
}

export default App;
