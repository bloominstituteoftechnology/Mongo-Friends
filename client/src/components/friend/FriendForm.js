import React from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import axios from 'axios'

class FriendForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: 0
        }
    }

    handleInput = (event) => {
      this.setState({[event.target.name]: event.target.value})
    };

    handleClick = (event) => {
        console.log('click from add form');
        this.props.onSubmit(this.state.firstName, this.state.lastName, this.state.age);
    };
    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input type="text" name="firstName"  placeholder="First Name" onChange={this.handleInput}/>
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" name="lastName"  placeholder="Last Name" onChange={this.handleInput}/>

                        <Label for="age">Age</Label>
                        <Input type="text" name="age"  placeholder="age" onChange={this.handleInput}/>
                    </FormGroup>
                    <Button onClick={this.props.handleClick}>Add Friend</Button>
                </Form>
            </div>
        );
    }

}
export default FriendForm;