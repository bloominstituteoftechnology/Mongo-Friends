import React from 'react';
import UpdateFriends from './UpdateFriends';

const each = {
    border: '2px solid blue'
}

const FriendsDisplay = props => {
    console.log("These are the passed props: ", props)
    return (
        <div style={each} >
            <h4>Name: {props.friend.firstName} {props.friend.lastName}</h4>
            <h4>Age: {props.friend.age}</h4>
            <h4>ID: {props.friend._id}</h4>
            <UpdateFriends id={props.friend._id} friend={props.friend} fetchData={props.fetchData} />
            </div>
    )
}

export default FriendsDisplay;