import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Route, Redirect } from "react-router-dom";

import FriendList from "./components/FriendList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <Redirect to="/api/friends" />} />
        <Route path="/api/friends" component={FriendList} />
      </div>
    );
  }
}

export default App;
