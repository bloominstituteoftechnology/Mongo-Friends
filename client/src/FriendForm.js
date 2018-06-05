import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class FriendForm extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      firstName: "",
      lastName: "",
      age: 0,
      email: "",
      mobileNumber: "",
      githubHandle: "",
      go: "no"
    }
  }

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitFriend = () => {
    const friendToSend = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      contactInfo: {
        email: this.state.email,
        mobileNumber: this.state.mobileNumber,
        githubHandle: this.state.githubHandle
      }
    }

    const myResetObj = {
      _id: "",
      firstName: "",
      lastName: "",
      age: 0,
      email: "",
      mobileNumber: "",
      githubHandle: "",
    };

    if (this.props.match.path === "/new") {
      axios.post('http://localhost:5000/api/friends', friendToSend)
        .then(friend => {
          myResetObj.go = "new";
        })
    } else {
      
    }
    this.setState(myResetObj);

  }

  render() {
    if (this.state.go === "new") return <Redirect to="/" />;
    return (
      <article style={{width:"85%"}} className=" center ma3 hidden ba mv4">
        <h1 className="f4 bg-near-black white mv0 pv2 ph3">Let's Meet Your New Friend!</h1>
        <div className="pa3 bt">
          <form autocomplete="off" className="measure center">
            <fieldset id="new_friend" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">New Friend</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="firstName">First Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.handleTextChange} value={this.state.firstName} type="text" name="firstName"  id="firstName" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="lastName">Last Name</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.handleTextChange} value={this.state.lastName} type="lastName" name="lastName"  id="lastName" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="age">Age</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.handleTextChange} value={this.state.age} type="number" name="age"  id="age" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="emailAddress">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.handleTextChange} value={this.state.emailAddress} type="email" name="emailAddress"  id="emailAddress" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="mobileNumber">Mobile Number</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.handleTextChange} value={this.state.mobileNumber}type="text" name="mobileNumber"  id="mobileNumber" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="githubHandle">Github Handle</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.handleTextChange} value={this.state.githubHandle} type="text" name="githubHandle"  id="githubHandle" />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
              <a href="#0" className="mv3 f6 link dim black db">Go Back</a>
            </div>
          </form>
        </div>
      </article>
    );
  }
}

export default FriendForm;