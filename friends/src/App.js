import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { Route } from "react-router-dom";
import Friends from "./Friends";
import Friend from "./Friend";

class App extends Component {

  constructor() {
    super();
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(result => this.setState({ friends: result.data }))
      .catch(err => console.log(err));
  }
  render() {
    return <div className="App">
        <Route exact path="/" render={props => <Friends {...props} friends={this.state.friends} />} />
        <Route path="/friends/:_id" render={props => <Friend {...props} friends={this.state.friends} />} />
      </div>;
  }
}

export default App;
