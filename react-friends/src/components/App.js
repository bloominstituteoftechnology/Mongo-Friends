import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFriends, createFriend, terminateFriend, editFriend } from '../actions';
import AddFriend from './AddFriend';

import './App.css';

class App extends Component {

  state = {
    firstName: '',
    lastName: '',
    age: ''
  }

  componentDidMount() {
    this.props.fetchFriends();
  }

  handleEditFriend = e => {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleEdit = (friend) => {
    let tempFriend = friend;
    if (this.state.firstName !== "") {
      tempFriend.firstName = this.state.firstName;
    }
    if (this.state.lastName !== "") {
      tempFriend.lastName = this.state.lastName;
    }
    if (this.state.age !== "") {
      tempFriend.age = this.state.age;
    }
    this.props.editFriend(friend._id, tempFriend);
    this.setState({
      firstName: '',
      lastName: '',
      age: ''
    });
  };

  render() {
    console.log(this.props)
    return <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to Friends</h1>
      </header>
      <div>
        <AddFriend />
      </div>
      <div className="friend-container">
        {this.props.friends.map(friend => {
          return (
            <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
              <div className="flipper">
                <div key={friend._id} className="friend-card front">
                  <ul>
                    <li><span className="title" >First Name:</span> {friend.firstName}</li>
                    <li><span className="title" >Last Name:</span> {friend.lastName}</li>
                    <li><span className="title" >Age:</span> {friend.age}</li>
                  </ul>
                </div>
                <div className="friend-card back">
                  <div className="edit-form">
                    <input onChange={this.handleEditFriend} value={this.state.firstName} name='firstName' placeholder={friend.firstName} />
                    <input onChange={this.handleEditFriend} value={this.state.lastName} name='lastName' placeholder={friend.lastName} />
                    <input onChange={this.handleEditFriend} value={this.state.age} name='age' placeholder={friend.age} />
                    <button onClick={() => this.handleEdit(friend)}
                    >Edit Friend
                    </button>
                    <button className="remove-button" onClick={() => this.props.terminateFriend(friend._id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    friends: state.friends,
    error: state.error,
    pending: state.pending
  }
}

export default connect(mapStateToProps, { fetchFriends, createFriend, terminateFriend, editFriend })(App);