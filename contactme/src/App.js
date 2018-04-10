import React, { Component } from 'react';
import './App.css';
import Friends from './Friends';
import { Button, Input } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      formFields: {
        firstName: '',
        lastName: '',
        age: 0,
        email: ''
      }
    };
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let formFields = {...this.state.formFields};
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
    console.log(this.state);
  }

  handleAddFriend(e, formFields) {
    e.preventDefault();       
    this.state.friends.push((this.state.formFields));
    e.target.reset();    
    this.setState({
      formFields
      }             
    )
    console.log('this is state', this.state);
    // axios
    // .post('http://localhost:5000/api/friends', formFields, {
    //   headers: {
    //     'Content-Type': 'application/json',
    // }
    // })
    // .then(function(response) {
    //   console.log(response);
    // })
    // .catch(function(error){
    //   console.log('error posting to db', error);
    // }); 
  }

  componentDidMount() {
    axios
    .get('http://localhost:5000/api/friends')
    .then(res => {
      this.setState({ friends: res.data });
    })
    .catch(error => {
      console.log('There was an error retrieving friends, refresh once connected to MONGO');
    });  
  }

  render() {
    return (
      <div className="App">
        <div><strong>Contact</strong>Me</div>
        <div>
          <form className="form" onSubmit={this.handleAddFriend}>
            <Input type="text" name="firstName" onChange={this.handleChange} placeholder="First Name" />
            <Input type="text" name="lastName" onChange={this.handleChange} placeholder="Last Name" />
            <Input type="text" name="age" onChange={this.handleChange} placeholder="Age" />
            <Input type="text" name="email" onChange={this.handleChange} placeholder="Email Address" />
            <Button type="submit">Add Friend</Button>
          </form>
          </div>
        {this.state.friends.map((friends, id) => {
          return (
            <div className="contact" key={id}>
            <Friends contacts={friends} />
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
