import React from 'react';
import './postStyles.css';

const Friend = props => {
  return (
    <div className="card">
      <div className="card-text">{props.card.firstName}</div>
      <div>{props.card.lastName}</div>
      <div>{props.card.age}</div>
    </div>
  );
};

export default Friend;
