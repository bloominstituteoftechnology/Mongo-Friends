import React from "react";
import Friend from "./Friend";

class FriendsList extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div className="friends-list">
                {this.props.friends.map(friend => {
                    return (
                    <div key={friend.id}>
                        <Friend friend={friend} />
                    </div>
                    )
                })}
            </div>
        )
    }
}

export default FriendsList;