import React, { Component } from 'react';
import { Card, Collapse, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Label,FormGroup,Input, Col,Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
const count = 0;
class FriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      collapse: false
    };
    this.toggle = this.toggle.bind(this);

  }

  addFriend = event => { 
      console.log('clicked')
    const friend ={}
    if (this.state.firstName !== '') {
        friend.firstName = this.state.firstName;
      }
       if (this.state.lastName !== '') {
        friend.lastName = this.state.lastName;
      }if (this.state.age !== '') {
        friend.age = this.state.age;
      }
    console.log(friend)
    axios
    .post('http://localhost:5000/friends', friend)
    .then(response =>{
      console.log(response);
      this.props.updateState();
    })
    .catch(err =>{
      console.log(err);
    });
    this.setState({
      firstName: '',
      lastName: '',
      age: ''
    });
    
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  checkToggle =()=>{
      console.log(this.state)
    if(this.state.collapse === false){ 
    this.toggle()
  }else{
    this.addFriend();
    this.toggle();
  }
}

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
      console.log(this.state)
      return(<React.Fragment>
       

          <Button color="success" className="friendBtn-style" onClick={this.checkToggle} type="submit">Add Friend</Button>
          <Collapse isOpen={this.state.collapse}>
          <FormGroup>
          <Row>
            <Col xs="4">
          <Input  
         onChange={this.handleInputChange}
         placeholder="first name"
         value={this.state.firstName}
         name="firstName"
           />
           </Col>
           <Col xs="4">
                 <Input 
         onChange={this.handleInputChange}
         placeholder="last name"
         value={this.state.lastName}
         name="lastName"
           />
      </Col>
      <Col xs="3">
                 <Input 
          onChange={this.handleInputChange}
          placeholder="age"
          value={this.state.age}
          name="age"
           />
      </Col>
     
           </Row>
        </FormGroup>
        </Collapse>

    </React.Fragment>);
  }
}

export default FriendForm;
