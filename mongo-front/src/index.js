import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router';
import Get from './Components/Get/Get.js';
import Post from './Components/Post/Post.js';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
(
<Router>
  <div>
    <Route exact path="/" component={App}/>
    <Route path="/friends/get" component={Get}/>
    <Route path="/friends/post" component={Post}/>
  </div>
</Router>
),
document.getElementById('root'));


registerServiceWorker();
