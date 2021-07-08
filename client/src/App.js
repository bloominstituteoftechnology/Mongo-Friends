import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Friends from './Components/Friends/Friends';
import Friend from './Components/Friend/Friend';
import Home from './Components/Home/Home';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      firstName: '',
      lastName: '',
      age: ''
    }
  }
  
  componentDidMount() {
    this.getFriends();
  }

  getFriends = () => {
    axios.get('http://localhost:5000/api/friends')
    .then(res => {
      console.log(res);
      this.setState({ friends: res.data })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleNewFriend = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addFriend = (e) => {
    const friend = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: Number(this.state.age),
    };
    axios.post('http://localhost:5000/api/friends', friend).then(savedFriend => {
      console.log(savedFriend);
      this.setState({ firstName: '', lastName: '', age: '' });
    }).catch(err => {
      console.log(err);
    });

  };

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/friends" render={props => <Friends {...props} friends={this.state.friends} handleNewFriend={this.handleNewFriend} addFriend={this.addFriend} state={this.state} />} />
        <Route exact path="/friends/:id" render={props => <Friend {...props} friends={this.state.friends} getFriends={this.getFriends} />} />
      </div>
    );
  }
}

export default App;
