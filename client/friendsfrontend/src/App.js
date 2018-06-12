import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    friends: [{}]
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
  }

  handleDelete = (id) => {
    axios
      .delete(`http://localhost:5005/api/friends/${id}`)
      .then((response) => {
           
        this.getData()
      })
  }

  // handleSubmit = (id) => {
  //   axios
  //     post(`http://localhost:5005/api/friends/${id}`, {

  //     })
  //     .this.getData()

  // }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        First Name:<input name="first-name" type="text" />
        Last Name:<input name="last-name" type="text" />
        Age:<input name="age" type="text" />
        <button onClick={this.handleSubmit}>Submit</button>

        {this.state.friends.map(friend => {
          return ( 
            <div key={friend._id + ''}>
                <div>
                  {friend.firstName}
                </div>
                <div>
                  {friend.lastName}
                </div>
                <div>
                  {friend.age}
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
