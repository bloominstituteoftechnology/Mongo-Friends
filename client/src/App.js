import React, { Component } from 'react';
import './App.css';
import FriendsList from './components/FriendsList'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }
  componentDidMount = () => {
    axios.get('http://localhost:5000/api/friends')
      .then(res => this.setState({ friends: res.data.friends }))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        <FriendsList friends={this.state.friends} />
      </div>
    );
  }
}

export default App;
