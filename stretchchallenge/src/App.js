import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import {Link} from 'react-router-dom';

// Show a card of a contact
//Click
//Should see the details

//on my [Juber Ahmed 12] -> {Juber Ahmed 12 githubusername email }
class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/friends/')
      .then(response => {
        this.setState({ friends: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.state.friends.map((friends, index) => {
            return (
              <Card key={index}>
                <CardBody>
                  <CardTitle>{friends.firstName}</CardTitle>
                  <CardSubtitle>{friends.lastName}</CardSubtitle>
                  <CardText>
                    This is how old you are {friends.age}.
                  </CardText>
                  <Link to="/friends/5acd200c83faf307fd4b4c02/contactInfo"><Button>See info</Button></Link>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
