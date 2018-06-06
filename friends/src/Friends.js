import React, { Component } from "react";
import { Link } from "react-router-dom";

class Friends extends Component {
  render() {
    return (
      <div className="friends">
        {this.props.friends.map(friend => {
          return <Link to={`friends/${friend._id}`} className="friend-link-wrap" key={friend._id}>
              <div className="card">
                <div className="card-body text-center">
                  <h4 className="card-title">{friend.firstName}</h4>
                  <p className="card-title">{friend.lastName}</p>
                </div>
              </div>
            </Link>;
        })}
      </div>
    );
  }
}

export default Friends;
