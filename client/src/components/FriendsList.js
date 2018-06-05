import React from "react";
import Friend from "./Friend";
import { Link } from "react-router-dom";

class FriendsList extends React.Component {

    render() {
        return (
            <div className="friends-list">
                {this.props.friends.map(friend => {
                    return (
                       <Friend friend={friend} key={friend._id}/>
                    );
                })}
            </div>
        )
    }
}

export default FriendsList;