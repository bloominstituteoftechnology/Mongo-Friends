import React, { Component } from 'react';
import axios from 'axios';

class NewFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            contactInfo: {
                email: '',
                mobileNumber: '',
                githubUsername: '',
                facebookUsername: '',
                twitterHandle: ''
            }
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value  })
    }

    ClickHandler = () => {
        const friend = { firstName: this.state.firstName, 
                         lastName: this.state.lastName,
                         age: this.state.age,
                         email: this.state.contactInfo.email,
                         mobileNumber: this.state.contactInfo.mobileNumber,
                         githubUsername: this.state.contactInfo.githubUsername,
                         facebookUsername: this.state.contactInfo.facebookUsername,
                         twitterHandle: this.state.contactInfo.twitterHandle
                        }
        axios
        .post(`http://localhost:5000/api/friends`, friend)
        .then(res => {
            console.log("Success")
        })
        .catch(err => {
            console.log("Failure")
        })
    }

    render() {
        return (
            <div>
                <input
                onChange={this.handleInputChange}              
                placeholder="First Name"           
                value={this.state.firstName}
                name="firstname"
            />
                <input
                name = 'LastName'
                value = { this.state.lastName }
                placeholder = "Last Name"
                onChange = {this.EventHandler}
                />
                <input
                name = 'Age'
                value = { this.state.age }
                placeholder = "Age"
                onChange = {this.EventHandler}
                />
                <input
                name = 'Contact Info Email'
                value = { this.state.contactInfo.email }
                placeholder = "Email"
                onChange = {this.EventHandler}
                />
                <input
                name = 'Contact Info Mobile Number'
                value = { this.state.contactInfo.mobileNumber }
                placeholder = "Mobile Number"
                onChange = {this.EventHandler}
                />
                <input
                name = 'Contact Info Github Username'
                value = { this.state.contactInfo.githubUsername }
                placeholder = "Github Username"
                onChange = {this.EventHandler}
                />
                <input
                name = 'Contact Info Facebook Username'
                value = { this.state.contactInfo.facebookUsername }
                placeholder = "Facebook Username"
                onChange = {this.EventHandler}
                />
                 <input
                name = 'Contact Info Twitter Handle'
                value = { this.state.contactInfo.twitterHandle }
                placeholder = "Twitter Handle"
                onChange = {this.EventHandler}
                />
                <button onClick ={this.ClickHandler}> SUBMIT BUTTON </button>
            </div>
        )
    }
}

export default NewFriend;