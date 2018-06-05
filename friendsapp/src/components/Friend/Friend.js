import React, { Component } from 'react';

class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "firstName",
            lastName: "lastName",
            age: 0,
            contactInfo: {
                email: "email@email.com"
            }   
        }
    }
    render() { 
        return (
            <div className={this.props.className}>
                <div>{this.state.firstName} </div>
                <div>{this.state.lastName} </div>
                <div>{this.state.age} year old</div>
                <div>{this.state.contactInfo.email} </div>
            </div>
        )
    }
}
 
export default Friend;