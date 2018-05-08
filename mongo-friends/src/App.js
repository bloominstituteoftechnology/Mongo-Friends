import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import FriendsList from './components/FriendsList';
import FriendView from './components/FriendView';
import AddFriend from './components/AddFriend';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Route exact path="/" component={FriendsList} />
       <Route path="/friends/:id" component={FriendView} />
       <Route path="/create" component={AddFriend} />
      </div>
    );
  }
}

export default App;