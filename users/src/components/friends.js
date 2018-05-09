import React, { Component } from 'react';

import Friend from './friend';

const Friends = props => {
  return (
    <div className="Friends">
      <h1>Friend List</h1>
      <ul>
        {props.friends.map(friend => {
          return (
            <Friend
              name={friend.name}
              id={friend.id}
              age={friend.age}
              height={friend.height}
              key={friend.id}
              deleteFriend={props.deleteFriend}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Friends;
