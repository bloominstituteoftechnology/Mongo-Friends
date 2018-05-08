import React, {Component} from 'react';
import classes from './styles.css';
import {createFriend} from '../../Actions/friendActions';
import {store} from '../../';

class AddFriend extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      addFriend: false,
    };
  }
  displayInput = () => {
    this.setState({addFriend: !this.state.addFriend});
  }
  changeValue = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  addFriend = () => {
    const friend = {firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age}
  }
  render() {
    let Button = <button onClick={this.displayInput}>Add Friend</button>;
    if (this.state.addFriend === true) {
      Button = (
        <React.Fragment>
          <div className={classes.Container__InputContainer}>
            <input
              placeholder= 'first name'
              name='firstName'
              value={this.state.firstName}
              onChange={this.changeValue}
              className={classes.Container__Input}
            />
            <input
              placeholder= 'last name'
              name='lastName'
              value={this.state.lastName}
              onChange={this.changeValue}
              className={classes.Container__Input}
            />
            <input
              placeholder= 'age'
              name='age'
              value={this.state.age}
              onChange={this.changeValue}
              type= 'number'
              className={classes.Container__Input}
            />
            <button>Submit</button>
          </div>
        </React.Fragment>
      )
    }
    return (
      <div className={classes.Container}>
        {Button}
      </div>
    )
  }
}
export default AddFriend;
