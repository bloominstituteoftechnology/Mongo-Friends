import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import DisplayFriends from '../DisplayFriends';
import DisplayFriend from '../DisplayFriend'

const Cockpit = () => {
  return (
    <Switch>
      <Route exact path='/friends' render={() => <DisplayFriends friends={this.props.friends}/>} />
      <Route path='/friends/:id' render={(props) => this.getFriend(props)}/>
    </Switch>
  )
}
export default Cockpit;
