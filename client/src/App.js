import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from  'axios' ;

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      friends:[{}]
    }
  }
  componentWillMount()
  {
    axios.get( 'http://localhost:5000/api/friends' )
      .then( respond =>
      {
        console.log( 'data', respond.data )
      this.setState ({friends:respond.data})  
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.friends.map( friend =>
        {
          return (
            <div>{friend.firstName}</div>
          )}        
)}
      </div>
    );
  }
}

export default App;
