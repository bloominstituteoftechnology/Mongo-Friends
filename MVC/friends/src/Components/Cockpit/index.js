import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import DisplayFriends from '../DisplayFriends';
import DisplayFriend from '../DisplayFriend'
class Cockpit extends Component{
  getFriend = (props) => {
    const friend = this.props.friends.find(friend => {
      return friend._id === props.match.params.id;
    });
    return <DisplayFriend {...friend}/>
  }
  render(){
    return (
      <Switch>
        <Route exact path='/friends' render={() => <DisplayFriends friends={this.props.friends}/>} />
        <Route path='/friends/:id' render={(props) => this.getFriend(props)}/>
      </Switch>
    )
  }
}
export default Cockpit;
