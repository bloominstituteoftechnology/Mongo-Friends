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
          <h1 className="App-title">Friends</h1>
        </header>
        
        <div>
          {this.state.mounted === false ? (
            <div> 
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          ) : (
            <div>
              

                {this.state.friends.map(friend => {
                  return(
                  <div key={friend._id} className="card">
                    <div className="headshot">
                      <img alt="Headshot" src="http://blogs.edweek.org/edweek/curriculum/Randall%20Munroe%20headshot.jpg"/>
                    </div>

                    <div className="w-80">
                      <div className="name">
                        <h2>{friend.firstName} {friend.lastName}</h2>
                      </div>
                      <h4>Age: {friend.age}</h4>

                      
                      {friend.contactInfo === undefined ? (
                        <div></div>
                      ) : (
                        <ul className="contactInfo">
                          <li>
                            <span>Email: </span> {friend.contactInfo.email}
                          </li>

                          <li>
                            <span>Number: </span> {friend.contactInfo.number}
                          </li>

                          <li>
                            <span>GitHub Handle: </span> {friend.contactInfo.githubUsername}
                          </li>
                        </ul>
                      )}

                    </div>


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
