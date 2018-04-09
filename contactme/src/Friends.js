import React from 'react';

const Friends = (props) => {
    const friend = props.contacts;
    return (
        <div>
            {friend.firstName}
        </div>
    )
}

export default Friends;