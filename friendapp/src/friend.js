import React from 'react';

const Friend = props => {
  return (
    <div>
      <div>{props.card.firstName}</div>
      <div>{props.card.lastName}</div>
      <div>{props.card.age}</div>
    </div>
  );
};

export default Friend;
