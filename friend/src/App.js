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
  
  delete = id =>{
    axios
    .delete(`http://localhost:5000/friends/${id}`)
    .then(response =>{
      console.log("deleted")
        this.updateState();
    })
    .catch(err =>{
        console.log(err);
    });
  };
  
  render() {
    console.log(this.state)
    return (
 <div className="App">
   <FriendsForm updateState={this.updateState}/>

<Friends friends={this.state.friends} updateState={this.updateState} delete={this.delete}/>
 </div>
    );
  }
}

export default App;
