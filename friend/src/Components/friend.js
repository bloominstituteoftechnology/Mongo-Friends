import React, { Component } from 'react';
import axios from 'axios';
import { Card, Collapse, CardText, CardBody,
    CardTitle,  Button,Label,FormGroup,Input, Col,Row, Modal,  ModalBody, ModalFooter } from 'reactstrap';


class Friend extends Component{
    constructor(props){
        super(props);

        
        this.state={  
        firstName:'',
        lastName:'',
        age:'',
        collapse: false,
        modal:false
    }
    this.toggle = this.toggle.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
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
      modalToggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      checkToggle =(id)=>{
        console.log(this.state)
      if(this.state.collapse === false){ 
      this.toggle()
    }else{
      this.updateFriend(id);
      this.toggle();
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
render(){
console.log("i sss")
    return(<React.Fragment>
    <div>  
      <Card>

      <div onClick={this.modalToggle} className="fas fa-times-circle"></div> 
          <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
    
          <ModalBody>
              are you sure you wish to delete this?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" className="danger" onClick={() => this.props.delete(this.props.id)}>Delete</Button>{' '}
            <Button color="primary" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
   
        <CardBody>
             <Row className="uppertext">  
                 <Col xs="12">
          <Label> {this.props.age}</Label>
          </Col>
          <Col xs="12">
          <CardTitle>{this.props.firstName}</CardTitle>
          </Col>
          <Col xs="12">
          <CardText for="exampleText">{this.props.lastName}</CardText>
          </Col>
           </Row>
     <Row className="x">
         <Col xs="12">
          </Col>
          <Col xs="12">
          <Button color="success" className="update-styles" onClick={() => this.checkToggle(this.props.id)} >update</Button>

          <Collapse isOpen={this.state.collapse}>
          <FormGroup>
          <Row>
          <Col xs="4">
      <Input 
          onChange={this.handleInputChange}
          placeholder="age"
          value={this.state.age}
          name="age"
           />
      </Col>
            <Col xs="12">
            <Input  
         onChange={this.handleInputChange}
         placeholder="first name"
         value={this.state.firstName}
         name="firstName"
           />
           </Col>
           <Col xs="12">
                 <Input 
              onChange={this.handleInputChange}
              placeholder="last name"
              value={this.state.lastName}
              name="lastName"
                
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