import React from 'react';
import classes from './index.css';

const DisplayFriend = props => {
  let contacts = null;
  if (props.contactInfo !== undefined && Object.keys(props.contactInfo).length > 0) {
    let contactKeys = [];
    for (let i in props.contactInfo){
      contactKeys.push(i)
    }
    contacts = (
      <div className={classes.Container__ContactContainer}>
        <span className={classes.Container__Subject}>Contact Info</span>:
        {contactKeys.map((key, i) => {
          return (
              <p className={classes.Container__Contact + " " + classes.Container__Padding_left} key={key + i}><span className={classes.Container__ContactType}>{key}</span>: {props.contactInfo[key]}</p>
          )
        })}
      </div>
    )
  }
  return (
    <div className={classes.Container}>
      <h1 className={classes.Container__Header}>{`${props.firstName} ${props.lastName}`}</h1>
      <p className={classes.Container__Text + " " + classes.Container__Margin_top}><span className={classes.Container__Subject}>Age</span>: {props.age}</p>
      <div className={classes.Container__Text + " " + classes.Container__Margin_top}>
        {contacts}
      </div>
    </div>
  )
}
export default DisplayFriend;
