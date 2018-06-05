import React from "react";

const FriendList = props => {
    return (
        <div className="friend-list">
            {props.friends.map(friend => {
                return (
                    <div key={friend.id} className="friend-card">
                    <div>
                        <h3>{friend.firstName} {friend.lastName}</h3>
                        <p>Age: {friend.age}</p>
                        <h5 className="contact">Contact Info</h5>
                    </div>
                    <div>
                        <p>Email: {friend.contactInfo.email}</p>
                        {friend.contactInfo.twitter_handle ? 
                            <p>Twitter: <span className="twitter-handle">{friend.contactInfo.twitter_handle}</span></p>  
                        : null}
                    </div>
                    </div>
                );
            })}
        </div>
    );
}

export default FriendList;