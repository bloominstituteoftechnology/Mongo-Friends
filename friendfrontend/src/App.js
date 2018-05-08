import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



class App extends Component {

  state = {
    friends: []
  }


  componentDidMount(){
    axios
    .get('http://localhost:5000/api/friends')
    .then(({data}) => {
      this.setState({friends: data})
    }).catch(err => console.log("theres an error boys"));
  }
  
  render() {
    console.log(this.state.friends);
    return (
      <div className="App">
        {this.state.friends.map(({firstName, lastName, age, contactInfo: {phoneNumber, email, gitHub}}) => {
          return(
          <div className="friendCard">
            <h2>{firstName}  {lastName}</h2>
            <h3>Age: {age}</h3>
            <div className="subCard">
             {phoneNumber}
             </div>
          </div>
          )
        })}
      </div>
    );
  }
}

export default App;
