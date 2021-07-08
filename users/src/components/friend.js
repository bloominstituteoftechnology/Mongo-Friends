import React from 'react';

const Friend = props => {
  return (
    <div className="Friend">
      <h3>{props.firstName}</h3>
      <h3>{props.lastName}</h3>
      <p>{props.age} years old</p>
      <button onClick={() => props.deleteFriend(props.id)}>Delete Friend</button>
    </div>
  );
};

export default Friend;
