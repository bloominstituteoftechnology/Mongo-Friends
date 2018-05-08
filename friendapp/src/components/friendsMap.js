import React from 'react';

export const FriendsMap = (props) => {
    return ( 
    <div>
          <p> {props.friend.firstName} </p>
          <p> {props.friend.lastName} </p>
          <p> {props.friend.age} </p>
          {props.friend.contactInfo.length > 0 &&
          <div>
            <p>
            {props.friend.contactInfo[0].email}
            </p>
            <p>
            {props.friend.contactInfo[0].mobileNumber}
            </p>
            <p>
            {props.friend.contactInfo[0].githubUsername}
            </p>
            <p>
            {props.friend.contactInfo[0].facebookUsername}
            </p>
            <p>
            {props.friend.contactInfo[0].twitterHandle}
            </p>
        </div>
        }
    </div> 
)}

