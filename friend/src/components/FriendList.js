import React from "react";

const FriendList = props => {
    return (
        <div className="friend-list">
            {props.friends.map(friend => {
                return (
                    <div key={friend.id} className="friend-card">
                        <h4>{friend.firstName} {friend.lastName}</h4>
                        <p>{friend.age}</p>
                        <p>{friend.contactInfo.email}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default FriendList;