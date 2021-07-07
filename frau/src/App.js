import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      friendArr: []
      // firstName: '',
      // lastName: '',
      // age: 0,
    }
  }



  componentDidMount() {
    this.getFriends();
  }
  getFriends = () => {
    axios
      .get(`http://localhost:5000/api/friends`)
      .then(response => {
        this.setState({ friendArr: response.data })
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
     {this.state.friendArr.map(friend => {
       return (
         <div className="friend-card" key={friend.id}>
         <h2>Name:    {friend.firstName} {friend.lastName}</h2>
         <h2>Age:   {friend.age}</h2>
         <h3>Contact Info:</h3>
         <h4>Email:   {friend.contactInfo.Email}</h4>
         <h4>Phone Number:    {friend.contactInfo.phoneNumber}</h4>
         <h4>Github Address:    {friend.contactInfo.gitHub}</h4>
         <h4>User Name:   {friend.contactInfo.userName}</h4>
         <h4>Facebook:    {friend.contactInfo.facebook}</h4>
         <h4>Twitter:   {friend.contactInfo.twitter}</h4>
           </div>
       )
     })}
      </div>
    );
  }
}

export default App;
