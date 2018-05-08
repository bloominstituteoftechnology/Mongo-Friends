import React from 'react';
import classes from './index.css';
import DisplayFriend from '../DisplayFriend';
import {Link} from 'react-router-dom';
const DisplayFriends = props => {
  let friends = null;
  if (props.friends.length > 0) {
    friends = (
      <React.Fragment>
        {props.friends.map((friend, i) => {
          return (
            <Link to={`/friends/${friend._id}`} key={friend + i}>
              <DisplayFriend {...friend}/>
            </Link>
          )
        })}
      </React.Fragment>
    )
  }
  return (
    <div className={classes.Container}>
      {friends}
    </div>
  )
}

export default DisplayFriends;
