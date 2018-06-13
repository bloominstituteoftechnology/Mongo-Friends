import React, { Component } from 'react';

class AddFriend extends Component {
    constructor() {
        super(); 
        this.state = {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSave = e => {
        console.log('addFriend: ', this.props)
        this.props.addFriend(this.state)
        this.setState({ firstName: '', lastName: '', age:''})
    }

    render() {
        return (
            <div>
                <div>
                    <input
                        type = 'text'
                        name = 'firstName'
                        placeholder = 'First Name'
                        value = {this.state.firstName}
                        onChange = {this.handleInput}
                    />
                    <input 
                        type = 'text'
                        name = 'lastName'
                        placeholder = 'Last Name'
                        value = {this.state.lastName}
                        onChange = {this.handleInput}
                    />
                    <input 
                        type = 'number'
                        name = 'age'
                        placeholder = 'Age'
                        value = {this.state.age}
                        onChange = {this.handleInput}
                    />
                    <button onClick={this.handleSave}>Add Friend Here</button>
                </div>
            </div>
        );
    }
}

export default AddFriend;