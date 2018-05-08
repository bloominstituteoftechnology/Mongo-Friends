import React from 'react';
import Friend from './Friend';
const friendList = props => {

    return (
        <div>
            <ul>
                {props.friends.map((friend) => {
                    return <Friend friend={friend}/>
                })}
            </ul>
        </div>
    );
};
export default friendList;