import React, { Component } from 'react';
import classes from  './App.css';
import {connect} from 'react-redux';
import {getFriends} from '../Actions/friendActions';
import {BrowserRouter as Router} from 'react-router-dom';
import Cockpit from '../Components/Cockpit';

class App extends Component {
  componentDidMount(){
    this.props.getFriends();
  }
  render() {
    return (
      <div className={classes.Container}>
        <header className={classes.Container__Header}>
          <h1 className={classes.Container__HeaderText}>Your Friends List:</h1>
        </header>
        <div className={classes.Container__FriendsContainer}>
          <Router>
            <Cockpit friends={this.props.friends} />
          </Router>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {...state}
}
export default connect(mapStateToProps, {getFriends})(App);
