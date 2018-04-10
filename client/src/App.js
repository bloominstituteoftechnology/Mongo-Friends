import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
        friends: [],
    }

    componentDidMount() {
        this.getFriends();
    }
    
    getFriends() {
        axios.get('http://localhost:5000/api/friends')
        .then(response => this.setState({ friends: response.data }))
        .catch(error => console.log('Could not grab friends because', error))
    }

  render() {
    return (
      <React.Fragment>
      <div className="App">
          {this.state.friends.map((friend, index) => {
              return (
                <ul key={index}>
                  <li>{friend.id}</li>
                  <li>{friend.firstName}</li>
                  <li>{friend.lastName}</li>
                  <li>{friend.age}</li>
                  <li>{friend.createdOn}</li>
                  <li>{friend.contactInfo}</li>
                </ul>
              )  
            })}
      </div>
      </React.Fragment>
    );
  }
}

export default App;
