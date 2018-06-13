import React, { Component } from 'react';
import './index.css';
import { Route, Switch } from 'react-router-dom';
import FriendsList from './FriendsList';
import Header from './header';
import SingleFriendView from './SingleFriendView';
import CreateFriend from './CreateFriend';
import EditFriend from './EditFriend';

class App extends Component {
  render() {
    return (
      <div className="App-intro">
        <Switch>
          <Route exact path='/' component={Header}/>
          <Route path='/friends' component={FriendsList} />
          <Route path='/friends/:id' component={SingleFriendView} />
          <Route path='/friends/create' component={CreateFriend} />

        </Switch>
        </div>
    );
  }
}

export default App;
