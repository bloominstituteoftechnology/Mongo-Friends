import React from 'react';
const DisplayFriend = props => {
  return (
    <div>
      <h1>{props.firstName}</h1>
      <h2>{props.lastName}</h2>
    </div>
  )
}
export default DisplayFriend;
