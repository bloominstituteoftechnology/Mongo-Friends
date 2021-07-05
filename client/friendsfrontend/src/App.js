import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    friends: [{}],
    firstName: '',
    lastName: '',
    age: ''
  }

  componentWillMount() { 
    this.getData();
  }

  getData = () => {
    axios
      .get('http://localhost:5005/api/friends')
      .then((response) => {
        this.setState({friends: response.data})
      })
      .catch(err => console.log(err));
  }

  handleDelete = (id) => {
    axios
      .delete(`http://localhost:5005/api/friends/${id}`)
      .then((response) => {
           
        this.getData()
      })
      .catch(err => console.log(err));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    axios
      .post(`http://localhost:5005/api/friends/`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age
      })
      .then(response => {
        console.log('post data', response.data)
        this.getData()
      })
      .catch(err => console.log(err));
  }

  render() {
    //console.log(this.state)
    return (
      <div className="App">
        <input 
          name="firstName" 
          type="text" 
          placeholder="First Name" 
          onChange={(e) => this.handleChange(e)} /><br />
        <input 
          name="lastName" 
          type="text" 
          placeholder="Last Name" 
          onChange={(e) => this.handleChange(e)} /><br />
        <input 
          name="age" 
          type="text" 
          placeholder="Age" 
          onChange={(e) => this.handleChange(e)} /><br />
        <button onClick={() => this.handleSubmit()}>Submit</button>

        {this.state.friends.map(friend => {
          return ( 
            <div key={friend._id + ''}>
              <div>
                First Name: {friend.firstName}
              </div>
              <div>
                Last Name:{friend.lastName}
              </div>
              <div>
                Age: {friend.age}
              </div>
              <button onClick={() => this.handleDelete(friend._id)}>X</button>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
