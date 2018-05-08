import React from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import axios from 'axios'

class FriendForm extends React.Component {

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input type="text" name="firstName"  placeholder="First Name"/>
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" name="lastName"  placeholder="Last Name"/>
                    </FormGroup>
                </Form>
            </div>
        );
    }

}
export default FriendForm;