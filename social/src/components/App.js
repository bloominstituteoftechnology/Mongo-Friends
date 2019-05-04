import React, { Component } from 'react';
import AppWrapper from './AppWrapper';
import FriendList from './friends/FriendList';
import FriendForm from './friends/FriendForm';

class App extends Component {
  state = {
    showForm: false,
    Friends: [],
  };

  displayForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  handleSubmitForm = input => {
    const url = `http://localhost:5000/api/friends`;
    fetch(url, {
      method: `post`,
      headers: {
        'Content-type': `application/json`,
      },
      body: input,
    })
      .then(response => response.json())
      .then(function(data) {
        console.log('Request succeeded with JSON response', data);
        // bring back the form
        this.setState({
          showForm: false,
        });
      })
      .catch(function(error) {
        console.log('Request failed', error);
      });
  };
  render() {
    return (
      <AppWrapper className="App">
        <h3>Friends</h3>
        <FriendList friends={this.state.Friends} />
        {this.state.showForm ? (
          <FriendForm handleSubmit={this.handleSubmitForm} />
        ) : (
          <button onClick={this.displayForm}> + </button>
        )}
      </AppWrapper>
    );
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/friends`)
      .then(response => response.json())
      .then(data => this.setState({ Friends: data }))
      .catch(err => {
        //handle errors,
      });
  }
}

export default App;
