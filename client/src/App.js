import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FriendList from './components/friend/FriendList';
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            friends: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/friends')
            .then(friend => {
                this.setState({friends: friend.data})
            })
    }

    deleteFriend = (event) => {

        const _id = event.target.id;
        console.log(_id);
        axios.delete(`http://localhost:5000/api/friends/${_id}`)
    };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          {/*<ul>*/}
              {/*{this.state.friends.map((friend) => {*/}
                  {/*return <li>{`${friend.firstName} ${friend.lastName}`}</li>*/}
              {/*})}*/}
          {/*</ul>*/}
          <FriendList friends={this.state.friends} onDelete={this.deleteFriend}/>
      </div>
    );
  }
}

export default App;
