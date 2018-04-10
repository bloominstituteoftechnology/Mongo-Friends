import React, { Component } from 'react';
import './App.css';
import Friends from './Friends';
import { Button, Input } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: []
    };
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }

  handleAddFriend(e) {
    e.preventDefault();   
    this.state.friends.push((this.state));
    e.target.reset();    
    this.setState({
      firstName: '',
      lastName: '',
      age: 0,
      email: ''
      }        
    )
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
