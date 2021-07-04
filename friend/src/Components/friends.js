import React from 'react';
import Friend from './friend';


const Friends = (props) =>{
    console.log(props.friends)
    return(<React.Fragment>

  <div>
     
      {props.friends.map(friend=>{
          return(
             
          <div key={friend._id}> 
 
        <Friend
        
         id={friend._id}
         firstName={friend.firstName}
         lastName={friend.lastName}
         age={friend.age}
         updateState={props.updateState}
         delete={props.delete}
         email={friend.contactInfo.email}
         mobile={friend.contactInfo.mobile}
         number={friend.contactInfo.number}
         github={friend.contactInfo.github_username}
         facebook={friend.contactInfo.facebook_username}
         twitter={friend.contactInfo.twitter_handle}

        />

          </div>
      )
      })}
  </div>

</React.Fragment>)}
export default Friends