import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Friends from './Components/friends'
import FriendsForm from './Components/friendForm'



class App extends Component {
  state={
    friends:[]

  }
  componentDidMount(){
    this.updateState()
  }
  updateState = () =>{
    axios
    .get('http://localhost:5000/friends')
    
    .then(response =>{
      console.log(response)
      this.setState({friends: response.data})
    })
    .catch(err =>{
      console.log(err)
    })
  }
  render() {
    console.log(this.state)
    return (
 <div>
   <FriendsForm updateState={this.updateState}/>

<Friends friends={this.state.friends}/>
 </div>
    );
  }
}

export default App;
