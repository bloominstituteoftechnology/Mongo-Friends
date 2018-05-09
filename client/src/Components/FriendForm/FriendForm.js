import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './FriendForm.css';

const FriendForm = props => {
    console.log(props);
    return ( 
        <Form onSubmit={props.addFriend} className="friendForm" inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="firstName" className="mr-sm-2">First Name:</Label>
                <Input type="text" id="firstName" onChange={props.handleNewFriend} placeholder="firstName" name="firstName" value={props.state.firstName} required />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="lastName" className="mr-sm-2">Last Name:</Label>
                <Input type="lastName" id="lastName" onChange={props.handleNewFriend} placeholder="lastName" name="lastName" value={props.state.lastName} required />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="age" className="mr-sm-2">Age:</Label> 
                <Input type="number" id="age" onChange={props.handleNewFriend} placeholder="age" name="age" value={props.state.age} required />
            </FormGroup>
        <Button>Add New Friend</Button>
      </Form>
    );
}

export default FriendForm;