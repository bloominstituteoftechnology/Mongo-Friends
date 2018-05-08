import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/friends")
      .then(response => {
        this.setState(() => ({ friends: response.data }));
      })
      .catch(err => {
        console.error("server Error", err);
      });
  }

  render() {
    return (
      <div>
        <h1>Friends List</h1>
        <div className="friendList">
          {this.state.friends.map(eachFriend => (
            <Link key={eachFriend._id} to={`/api/friends/${eachFriend._id}`}>
              <div>
                <h2>Name:</h2> {eachFriend.firstName} {eachFriend.lastName}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default FriendList;
