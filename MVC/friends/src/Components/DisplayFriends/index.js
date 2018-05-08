import React from 'react';
import classes from './index.css';
import DisplayFriend from '../DisplayFriend';
import {Link} from 'react-router-dom';
import AddFriend from '../AddFriend';

const DisplayFriends = props => {
  let friends = null;
  if (props.friends.length > 0) {
    friends = (
      <React.Fragment>
        {props.friends.map((friend, i) => {
          return (
            <Link to={`/friends/${friend._id}`} key={friend + i} className={classes.Container__Link}>
              <DisplayFriend friend={friend}/>
            </Link>
          )
        })}
      </React.Fragment>
    )
  }
  return (
    <div className={classes.Container}>
      <AddFriend />
      {friends}
    </div>
  )
}

export default DisplayFriends;
