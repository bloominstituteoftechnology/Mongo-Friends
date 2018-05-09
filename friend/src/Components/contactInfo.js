import React,{Component} from 'react';
import Friend from './friend';
import { Collapse, Button, CardBody, Card,  ListGroup, ListGroupItem } from 'reactstrap';

class ContactInfo extends Component{
    constructor(props){
        super(props)
        this.state={
        collapse: false
    }
    this.toggle = this.toggle.bind(this);

    }
    

    toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
    
    render(){
    console.log("importing this into contact info component", this.props)
    return(<React.Fragment>

     <div className="contact-styles"> {`Show ${this.props.firstName} ${this.props.lastName}'s contact information`}     
</div>
<div className="fas fa-caret-square-down"  onClick={this.toggle}></div>
<Collapse isOpen={this.state.collapse}>
<Card>
<ListGroup>
        <ListGroupItem>{`${this.props.firstName}'s contact information.`}</ListGroupItem>
        <ListGroupItem>{this.props.email}</ListGroupItem>
        <ListGroupItem>{this.props.number}</ListGroupItem>
        <ListGroupItem>{this.props.github}</ListGroupItem>
        <ListGroupItem>{this.props.facebook}</ListGroupItem>
        <ListGroupItem>{this.props.twitter}</ListGroupItem>
      </ListGroup>
      </Card>
</Collapse>
  

</React.Fragment>)}
}
export default ContactInfo