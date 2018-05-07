import React, { Component } from 'react';
import axios from 'axios';

class FriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: ''
    };
  }

  postFriend = event => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/friends', this.state)
      .then(response => {
        this.setState({
          firstName: '',
          lastName: '',
          age: ''
        });
        window.location.reload();
        console.log('posted');
      });
  };

  addFirst = event => {
    event.preventDefault();
    this.setState({ firstName: event.target.value });
  };

  addLast = event => {
    event.preventDefault();
    this.setState({ lastName: event.target.value });
  };

  addAge = event => {
    event.preventDefault();
    this.setState({
      age: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.postFriend}>
          <label>Enter first name</label>
          <input onChange={this.addFirst} value={this.state.firstName} />
          <label>Enter lastName name</label>
          <input onChange={this.addLast} value={this.state.lastName} />
          <label>Enter an age</label>
          <input onChange={this.addAge} value={this.state.age} />
          <button type="submit">push</button>
        </form>
      </div>
    );
  }
}

export default FriendForm;
