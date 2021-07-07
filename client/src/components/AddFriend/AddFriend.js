import React, { Component } from 'react';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
} from 'reactstrap';

class AddFriend extends Component {
    state = {
        firstName: '',
        lastName: '',
        age: 0,
    }

    render() {
        return (
            <Form onSubmit={() => this.handleSubmit()}>
                <FormGroup>
                    <Label to='firstName'>First Name</Label>
                    <Input name='firstName' placeholder='First Name' onChange={this.handleChange.bind(this)}/>
                    <Label to='lastName'>Last Name</Label>
                    <Input name='lastName' placeholder='Last Name' onChange={this.handleChange.bind(this)}/>
                    <Label to='age'>Age</Label>
                    <Input name='age' placeholder='Age' onChange={this.handleChange.bind(this)}/>
                    <Button value='Submit'>Add Friend</Button>
                </FormGroup>
            </Form>

        );
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit() {
        const newFriend = this.state;
        axios
            .post('http://localhost:5000/api/friends', {
                firstName: newFriend.firstName,
                lastName: newFriend.lastName,
                age: newFriend.age,
                createdOn: Date.now(),
            }).then(response => console.log(response));
    }
}

export default AddFriend;