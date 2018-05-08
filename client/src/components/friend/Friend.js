import React from 'react';

const friend = props => {

    return (
        <div>
            <il> {`${props.friend.firstName} ${props.friend.lastName} ${props.friend.age}`} </il>
        </div>
    );
};

export default friend;