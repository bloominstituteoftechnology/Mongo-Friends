import React, { Component } from 'react';
import axios from 'axios';
import {
  Form,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardColumns,
  Container,
  CardTitle,
  CardText
} from 'reactstrap';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: '',
      edit: 'none',
      display: '',
    };
    console.log('edit', this.state.edit)
  }

  showHandler() {
    if (this.state.display === '') {
      this.setState({ display: 'none'})
    }
    else if (this.state.display === 'none') {
      this.setState({ display: '' })
    }
  }

  editHandler() {
    if (this.state.edit === 'none') {
      this.setState({ edit: '' })
    }
    else if (this.state.edit === '') {
      this.setState({ edit: 'none' })
    }
  }

  componentDidMount() {
    axios
      .get(`localhost:5000/api/friends`)
      .then(response => this.setState({ posts: response.data }))
      .catch(error => {
        console.log('Error!', error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Container style={{ display: 'flex', justifyContent: 'center'}}>
          <CardColumns>
            {this.state.posts.map(post => {
              console.log('PostID', post.id)
              return (
                <div key={post.id}>
                  <Card>
                    <CardBody>
                      <CardTitle>{post.title}</CardTitle>
                      <CardText>{post.contents}</CardText>
                    </CardBody>
                    <Button onClick={this.editHandler}>Button</Button>
                  </Card>
                  <Form style={{ display: `${this.state.edit}`}}>
                    <Label>Change Title</Label>
                    <Input type='text' name='title' placeHolder='title'/>
                  <Label>Change Contents</Label>
                  </Form>
                </div>
              );
            })}
          </CardColumns>
        </Container>
      </div>
    );
  }
}

export default App;