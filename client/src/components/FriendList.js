import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "./friend.css";

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
        <h2 className="friendList-title">Friends List</h2>
        <div className="friendList-container">
          {this.state.friends.map(eachFriend => (
            <Link key={eachFriend._id} to={`/api/friends/${eachFriend._id}`}>
              <div className="friendList">
                <h2>
                  {eachFriend.firstName} {eachFriend.lastName}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default FriendList;
