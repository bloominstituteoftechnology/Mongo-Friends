import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import FriendsList from './components/FriendsList/FriendsList';
import AddFriend from './components/AddFriend/AddFriend';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 className='App_heading'>Friends Are Cool</h1>
          </Col>
        </Row> 
        <FriendsList/>
        <AddFriend/>
      </Container>
    );
  }
}

export default App;
