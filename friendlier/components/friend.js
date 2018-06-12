import React from 'react';

const Friend = (props) => {
    return(
        <div className='col-4'>
            <h1>{`${props.firstName} `}{props.lastName}</h1>
            <h3>{props.age}</h3>
            <h5 className="col-6">{props.contactInfo.email}</h5><h5 className='col-6'>{props.contactInfo.phone}</h5>
        </div>
    )
}

export default Friend;