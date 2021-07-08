import React, { Component } from 'react';
import axios from 'axios';

class FriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
    };
  }

  addSmurf = event => {
    event.preventDefault();
    const { firstName, lastName, age } = this.state;
    const friend = { firstName, lastName, age };
    axios
      .post('http://localhost:5000/api/friends', friend)
      .then(response => {
        this.props.addFriendsOnCreate(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      firstName: '',
      lastName: '',
      age: '',
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="FriendForm">
        <form onSubmit={this.addFriend}>
          <input
            onChange={this.handleInputChange}
            placeholder="First Name"
            value={this.state.firstName}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="lastName"
            value={this.state.lastName}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <button type="submit">Add Friend</button>
        </form>
      </div>
    );
  }
}

export default FriendForm;
