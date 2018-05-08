import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mounted: false,
      friends: [],
    }
  }

  componentDidMount() {
    this.fetchData()
  }


  fetchData() {
    axios.get("http://localhost:5000/api/friends")
      .then(response => {
        this.setState({
          friends: response.data,
          mounted: true,
        })
        console.log(this.state.friends)
      }).catch(err => {
        console.log("There was an error fetching data")
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <div>
          {this.state.mounted === false ? (
            <div>Please hold</div>
          ) : (
            <div>
                {this.state.friends.map(friend => {
                  return(
                  <div key={friend._id}>
                    <h2>{friend.firstName} {friend.lastName}</h2>
                  </div>
                  )
                })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
