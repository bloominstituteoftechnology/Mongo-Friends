import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import PostsContainer from './components/postsContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostsContainer />
      </div>
    );
  }
}

export default App;
