import React from 'react';
import UpdateFriends from './UpdateFriends';
import  ContactsLogic  from './ContactsLogic';

const each = {
    border: '3px solid blue',
    margin: 12
}
const main = {
    border: '2px solid yellow'
}

const FriendsDisplay = props => {
    // console.log("These are the passed props: ", props)
    return (
        <div style={each} >
        <div style={main}>
            <h4>Name: {props.friend.firstName} {props.friend.lastName}</h4>
            <h4>Age: {props.friend.age}</h4>
            <h4>ID: {props.friend._id}</h4>
            </div>
            <ContactsLogic  id={props.friend._id} fetchData={props.fetchData} />
            <UpdateFriends id={props.friend._id} friend={props.friend} fetchData={props.fetchData} />
            </div>
    )
}

export default FriendsDisplay;