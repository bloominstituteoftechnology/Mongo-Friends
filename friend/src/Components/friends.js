import React from 'react';
import Friend from './friend';

const Friends = (props) =>{
    console.log(props.friends)
    return(<React.Fragment>
  <div>friends</div>
  <div>
      {props.friends.map(friend=>{
          return(
          <div> 
        <Friend
         id={friend._id}
         firstName={friend.firstName}
         lastName={friend.lastName}
         age={friend.age}
         contactinfo={friend.contactinfo}
        />

          </div>
      )
      })}
  </div>

</React.Fragment>)}
export default Friends