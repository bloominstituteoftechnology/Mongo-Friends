import React, { Component } from 'react';
import axios from 'axios';

import Friend from './friend';
class FriendList extends Component {
  state = {
    friends: []
  };

  componentDidMount = () => {
    axios
      .get('http://localhost:5000/api/friends')
      .then(response => {
        this.setState({ friends: response.data });
      })
      .catch(error => {
        console.log('gone done goofed');
      });
  };
  render() {
    return (
      <div className="contain">
        {this.state.friends.map((friend, id) => {
          return <Friend card={friend} key={id} />;
        })}
      </div>
    );
  }
}

export default FriendList;
