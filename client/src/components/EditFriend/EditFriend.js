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


class EditFriend extends Component {
    state = {
        firstName: '',
        lastName: '',
        age: 0,
    }

    render() {
        return ( 
            <Form onSubmit={() => this.handleSubmit(this.props.friend._id)}>
                <FormGroup>
                    <Input name='firstName' placeholder='First Name' onChange={this.handleChange.bind(this)}/>
                    <Input name='lastName' placeholder='Last Name' onChange={this.handleChange.bind(this)}/>
                    <Input name='age' placeholder='Age' onChange={this.handleChange.bind(this)}/>
                    <Button value='Submit'>Edit Friend</Button>
                </FormGroup>
            </Form>
        );
    }

    componentDidMount() {
        const friend = this.props.friend;

        this.setState({
            firstName: friend.firstName,
            lastName: friend.lastName,
            age: friend.age,
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(id) {
        const update = this.state;
        axios
            .put(`http://localhost:5000/api/friends/${id}`, update)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }
}

export default EditFriend;