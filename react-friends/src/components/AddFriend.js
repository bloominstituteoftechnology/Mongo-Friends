import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFriend } from '../actions';


class AddFriend extends Component {
  state = {
    name: '',
    age: '',
    height: ''
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
          <input onChange={this.handleFriendInput} value={this.state.name} name='firstName' placeholder="First Name" />
          <input onChange={this.handleFriendInput} value={this.state.age} name='lastName' placeholder="Last Name" />
          <input onChange={this.handleFriendInput} value={this.state.height} name='age' placeholder="Age" />
          <button onClick={this.handleClick}
          >Add Friend
                    </button>
        </div>
      </div>
    )
  }
}

export default connect(null, { createFriend })(AddFriend);