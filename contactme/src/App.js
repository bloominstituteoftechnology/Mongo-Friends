import React, { Component } from 'react';
import './App.css';
import Friends from './Friends';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: []
    };
  }
  
  componentDidMount() {
    axios
    .get('http://localhost:5000/api/friends')
    .then(res => {
      this.setState({ friends: res.data });
    })
    .catch(error => {
      console.log('There was an error retrieving friends');
    });  
  }

  render() {
    return (
      <div className="App">
        <h2>Friends</h2>
        {this.state.friends.map((friends, id) => {
          return (
            <div key={id}>
            <Friends contacts={friends} />
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
