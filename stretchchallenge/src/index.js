import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ContactInfo from './component/contactInfo'; 

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/friends/:id/contactInfo" component={ContactInfo} />
    </div>
  </Router>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
