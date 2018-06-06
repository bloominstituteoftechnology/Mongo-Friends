import React, { Component } from 'react';
import './App.css';
import { fetchFriends, createFriend, terminateFriend, editFriend } from '../actions';
import { connect } from 'react-redux';
import AddFriend from './AddFriend';
/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own. 
 Just remember, `how do I `connect` my components to redux?`
 `How do I ensure that my component links the state to props?`
 */
class App extends Component {

  state = {
    firstName: '',
    lastName: '',
    age: ''
  }

  componentWillMount() {
    this.props.fetchFriends();
  }

  handleEditFriend = e => {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleEdit = (friend) => {
    this.props.editFriend(friend._id, this.state);
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
          // if (friend.firstName === "Error") {
          //   return (
          //     <div>
          //       {friend.firstName}
          //       {friend.lastName}
          //       {friend.age}
          //     </div>
          //   )
          // }
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