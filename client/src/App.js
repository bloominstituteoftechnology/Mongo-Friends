import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Route, Redirect } from "react-router-dom";

import Home from "./components/Home"

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" render={() => <Redirect to="/api/friends" />} />
        <Route path="/api/friends" component={Home} />
      </div>
    );
  }
}

export default App;
