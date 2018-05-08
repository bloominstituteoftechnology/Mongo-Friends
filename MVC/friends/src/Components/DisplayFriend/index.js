import React from 'react';
import classes from './index.css';

const DisplayFriend = props => {
  console.log(props);
  let editButtons = null;
  let contacts = null;
  if (props.friend.contactInfo !== undefined && Object.keys(props.friend.contactInfo).length > 0) {
    let contactKeys = [];
    for (let i in props.friend.contactInfo){
      contactKeys.push(i)
    }
    contacts = (
      <div>
        <span className={classes.Container__Subject}>Contact Info</span>:
        {contactKeys.map((key, i) => {
          return (
              <p className={classes.Container__Padding_left} key={key + i}><span className={classes.Container__ContactType}>{key}</span>: {props.friend.contactInfo[key]}</p>
          )
        })}
      </div>
    )
  }
  // if (props.match !== undefined) {
  //   editButtons = (
  //
  //   )
  // }
  return (
    <div className={classes.Container}>
      <h1 className={classes.Container__Header}>{`${props.friend.firstName} ${props.friend.lastName}`}</h1>
      <p className={classes.Container__Text + " " + classes.Container__Margin_top}><span className={classes.Container__Subject}>Age</span>: {props.friend.age}</p>
      <div className={classes.Container__Text + " " + classes.Container__Margin_top}>
        {contacts}
      </div>
    </div>
  )
}
export default DisplayFriend;
