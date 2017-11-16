import React, { Component } from 'react';

import './App.css';
import PostsContainer from './components/postsContainer.js';
import AddNewPost from './components/AddPost.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostsContainer />
        <AddNewPost />
      </div>
    );
  }
}

export default App;
