import React from 'react';

const Friend = (props) => {
    return(
        <div className='col-3 mb-3 mr-1 ml-1 friendCard d-flex flex-column'>
            <h1>{`${props.firstName} `}{props.lastName}</h1>
            <h4>{props.age}</h4>
            <p>{props.email}</p>
            <p>{props.phone}</p>
        </div>
    )
}

export default Friend;