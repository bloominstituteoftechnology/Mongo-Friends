import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return(
    <div>
      <nav>
        <Link className="link" to="/friends/get">Friends List</Link>
        <Link className="link" to="/friends/post">Add New Friend</Link>
      </nav>
    </div>
    );
  }
}

export default App;
