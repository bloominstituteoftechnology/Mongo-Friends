import React, { Component } from 'react';
import { addFriend } from '../actions';
import { connect } from 'react-redux';
import './AddFriend.css';
import { Link } from 'react-router-dom';

class AddFriend extends Component {
    state = {
        firstName: '',
        lastName: '',
        age: '',
        contactInfo: {
            phoneNum: '',
            email: '',
        }
      };

  render() {
    return (
         
        <div className="addFriendContainer">
        <h3 className="headerNotes">Add a friend:</h3>
        <div className="inputFields">
        <div className="inputFirst">
            <input
                type="text"
                className="firstName"
                name="firstName"
                value={this.state.firstName}
                placeholder="Enter your first name..."
                onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
        </div>
        <div className="inputSecond">
            <input
                type="text"
                className="lastName"
                name="lastName"
                value={this.state.lastName}
                placeholder="Enter your last name..."
                onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
        </div>
        <div className="inputThird">
            <input
                type="Number"
                className="age"
                name="age"
                value={this.state.age}
                placeholder="Enter your age..."
                onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
        </div>
        <div className="inputSecond">
            <input
                type="text"
                className="phoneNum"
                name="phoneNum"
                value={this.state.contactInfo.phoneNum}
                placeholder="Enter your phone number..."
                onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
        </div>
        <div className="inputSecond">
            <input
                type="text"
                className="email"
                name="email"
                value={this.state.contactInfo.email}
                placeholder="Enter your email..."
                onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
        </div>
        </div>
        <div>
        <button className="saveButton"
          onClick={() => {
            this.props.addFriend({ firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, phoneNum: this.state.contactInfo.phoneNum, email: this.state.contactInfo.email });
            this.setState({ firstName: '', lastName: '', age: '', phoneNum: '', email: '' });
          }}>Save</button><Link to='/'><button className="button">Back</button></Link>
        </div>
   </div>);
  }
}

const mapStateToProps = state => {
  return {
    friend: state.friend,
    addingFriend: state.addingFriend,
    error: state.error
  };
};

export default connect(mapStateToProps, { addFriend })(AddFriend);