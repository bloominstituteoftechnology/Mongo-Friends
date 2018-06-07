import React from 'react';

import './Friend.css';

const Friend = props => {

    return (
        <div>
            <img className="profile-img" src={props.friend.imageUrl}/>
            <h3>{props.friend.firstName}</h3>
        </div>
    )
}


export default Friend;