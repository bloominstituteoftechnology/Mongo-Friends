import React, { Component } from 'react';
import Get from './Components/Get/Get.js';
import Post from './Components/Post/Post.js';
import './App.css';

class App extends Component {
  render() {
    return(
    <div>
      <Get/>
      <Post/>
    </div>
    );
  }
}

export default App;
