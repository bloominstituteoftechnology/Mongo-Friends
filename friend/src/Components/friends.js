import React from 'react';
import Friend from './friend';

const Friends = (props) =>{
    console.log(props)
    return(<React.Fragment>
  <div>friends</div>
  <div>
      {props.friends.map(friend=>{
          return(
          <div key={friend._id}> 
        <Friend
         id={friend._id}
         firstName={friend.firstName}
         lastName={friend.lastName}
         age={friend.age}
         contactinfo={friend.contactinfo}
         updateState={props.updateState}
        />

          </div>
      )
      })}
  </div>

</React.Fragment>)}
export default Friends