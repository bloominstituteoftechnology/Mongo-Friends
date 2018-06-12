import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";
import FriendsList from "./friendsList";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Friends List</h1>
          <Route path="/" exact component={FriendsList} />
        </div>
      </Router>
    );
  }
}

export default App;
