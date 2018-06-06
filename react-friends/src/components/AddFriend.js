import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createFriend } from '../actions';


class AddFriend extends Component {
  state = {
    firstName: '',
    lastName: '',
    age: ''
  }

  handleFriendInput = e => {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    this.props.createFriend(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      age: ''
    });
  };

  render() {
    return (
      <div>
        <div className="form">
          <input onChange={this.handleFriendInput} value={this.state.firstName} name='firstName' placeholder="First Name" />
          <input onChange={this.handleFriendInput} value={this.state.lastName} name='lastName' placeholder="Last Name" />
          <input onChange={this.handleFriendInput} value={this.state.age} name='age' placeholder="Age" />
          <button onClick={this.handleClick}
          >Add Friend
                    </button>
        </div>
      </div>
    )
  }
}

export default connect(null, { createFriend })(AddFriend);