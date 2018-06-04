import React, { Component } from 'react';
import FriendsList from './components/FriendsList'
import axios from 'axios'

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      phone: '',
      fbUsername: '',
      ghUser: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentDidMount = () => {
    axios.get('http://localhost:5000/api/friends')
      .then(res => this.setState({ friends: res.data.friends }))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="forms">
        <div className="header">
          <Form className="form-wrapper">
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input type="name" value={this.state.firstName} onChange={this.handleChange} name="firstName" id="firstName" placeholder="Enter your First Name here" />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input type="lastName" value={this.state.lastName} onChange={this.handleChange} name="lastName" id="lastName" placeholder="Enter your Last Name here" />
            </FormGroup>
            <FormGroup>
              <Label for="Age">Age</Label>
              <Input type="Age" value={this.state.age} onChange={this.handleChange} name="Age" id="Age" placeholder="Enter your Age here" />
            </FormGroup>
            {/* <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="lastName" name="lastName" id="lastName" placeholder="Enter your Last Name here" />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="lastName" name="lastName" id="lastName" placeholder="Enter your Last Name here" />
                </FormGroup> */}
          </Form>
        </div>

        <div className="App">

          <FriendsList friends={this.state.friends} />
        </div>
      </div>
    );
  }
}

export default App;
