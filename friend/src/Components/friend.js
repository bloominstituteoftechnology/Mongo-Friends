import React, { Component } from 'react';
import axios from 'axios';
import { Card, Collapse, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Label,FormGroup,Input, Col,Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Friend extends Component{
    constructor(props){
        super(props);

        
        this.state={  
        firstName:'',
        lastfirstName:'',
        age:'',
        collapse: false
    }
    this.toggle = this.toggle.bind(this);
}
toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

    updateFriend = id => {
    console.log(id)
        const friend = {};
        if (this.state.firstName !== '') {
          friend.firstName = this.state.firstName;
        }
         if (this.state.lastName !== '') {
          friend.lastName = this.state.lastName;
        }
        if (this.state.age !== '') {
            friend.age = this.state.age;
          }
       
        axios
          .put(`http://localhost:5000/friends/${id}`, friend)
          .then(response => {
            this.setState({
                firstName: '',
                lastName: '',
                age:'',           
            });
            this.props.updateState();
          })
          .catch(err => {
            console.log(err);
          });
      };


      checkToggle =(id)=>{
        console.log(this.state)
      if(this.state.collapse === false){ 
      this.toggle()
    }else{
      this.updateFriend(id);
      this.toggle();
    }
  }

    setInput = (element)=>{
        this.setState({[element.target.firstName]: element.target.value})
       }
render(){
console.log(this.props.id)
    return(<React.Fragment>
    <div> 
      <Card>
          
        <CardBody>
          <Label>age:{this.props.age}</Label>
          <CardTitle>{this.props.firstName}</CardTitle>
         
          <CardText for="exampleText">{this.props.lastName}</CardText>
           
     <Row className="x">
         <Col xs="12">
          <Button color="danger">Delete</Button>
          </Col>
          <Col xs="12">
          <Button color="success" onClick={this.updateFriend(this.props.id)} >update</Button>

          <Collapse isOpen={this.state.collapse}>
          <FormGroup>
          <Row>
            <Col xs="12">
          <Input  
          onChange={this.setInput}
          type="input" 
          placeholder="firstName"
          ame="firstName" 
     
          value={this.state.firstName}
           />
           </Col>
           <Col xs="12">
                 <Input 
          onChange={this.setInput}
          type="input" 
          placeholder="lastName"
          name="lastName" 
       
          value={this.state.lastName}
           />
      </Col>
      <Col xs="6">
                 <Input 
          onChange={this.setInput}
          type="input" 
          placeholder="age"
          name="age" 
          
          value={this.state.age}
           />
      </Col>
     
           </Row>
        </FormGroup>
        </Collapse>
          </Col>
    </Row>
        </CardBody>
      </Card>
    </div>
   </React.Fragment> )
}



}
export default Friend