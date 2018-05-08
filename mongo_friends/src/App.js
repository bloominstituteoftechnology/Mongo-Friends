import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg'
import './App.css';
import styled from 'styled-components';

const StyledDiv = styled.div`
width: 600px; 
height: 100px; 
border: 2px solid black;
padding-top: 25px; 
margin: 0 auto; 
margin-bottom: 10px;  
background: white; 
box-shadow: 3px 5px; 
font-weight: bolder; 
&:hover{
  background: lightblue; 
  box-shadow: none; 
}`;

const Li = styled.div`
padding: 2px; 
font-size: 20px; 
}`;

class App extends Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    this.getFriends();
  }

  getFriends = () => {
    axios
      .get("http://localhost:5000/api/friends")
      .then(response => {
        this.setState({ friends: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Mongo Friends</h1>
        </header>
        <ul>
          {this.state.friends.map(friend => {
            return (
              <StyledDiv>
                <li key={friend.id} className="friend"></li>
                <Li className="name">{friend.firstName}</Li>
                <Li className="name">{friend.lastName}</Li>
                <Li className="age">{`Age:${friend.age}`}</Li>
              </StyledDiv>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
