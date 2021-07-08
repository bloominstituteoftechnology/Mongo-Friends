import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText, Container, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './Friend.css';

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: null,
      showUpdateFriendForm: false,
      firstName: '',
      lastName: '',
      age: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getFriend(id);
  }

  getFriend = id => {
    axios
      .get(`http://localhost:5000/api/friends/${id}`)
      .then(res => {
        this.setState({ friend: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateFriend = friendId => {
    const friend = {};
    if (this.state.firstName !== '') {
      friend.firstName = this.state.firstName;
    }
    if (this.state.lastName !== '') {
      friend.lastName = this.state.lastName;
    }
    if (this.state.age !== '') {
      friend.age = Number(this.state.age);
    }
    
    axios
      .put(`http://localhost:5000/api/friends/${friendId}`, friend)
      .then(res => {
        this.setState({
          showUpdateFriendForm: false,
          firstName: '',
          lastName: '',
          age: ''
        });
        this.props.getFriends();
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteFriend = friendId => {
    axios
      .delete(`http://localhost:5000/api/friends/${friendId}`)
      .then(res => {
        window.location = 'http://localhost:3000/friends';
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleEditFriend = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showUpdateFriendForm = () => {
    this.setState({ showUpdateFriendForm: !this.state.showUpdateFriendForm });
  };

  render() {
    if (!this.state.friend) {
      return (
        <div>
          <Container className="friendContainer">
            <Row className="friendsRow">
              <Col sm="12">
                <Card body>
                  <CardTitle>No Friend found!</CardTitle>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    const { _id, firstName, lastName, age } = this.state.friend;
    return (
      <div>
        <Container className="friendContainer">
          <Row className="friendsRow">
            <Col sm="12">
              <Card body>
                <CardTitle>First Name: {firstName}</CardTitle>
                <CardText>Last Name: {lastName}</CardText>
                <CardText>Age: {age}</CardText>
                <div className="editFriend">
                  <Button
                    color="warning"
                    className="editFriendButton"
                    onClick={this.showUpdateFriendForm}
                  >
                    Update
                  </Button>
                  <Button
                    color="danger"
                    className="editFriendButton"
                    onClick={() => this.deleteFriend(_id)}
                  >
                    Delete
                  </Button>
                </div>
                {this.state.showUpdateFriendForm ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handleEditFriend}
                      placeholder="firstName"
                      name="firstName"
                      value={this.state.firstName}
                    />
                    <input
                      type="text"
                      onChange={this.handleEditFriend}
                      placeholder="lastName"
                      name="lastName"
                      value={this.state.lastName}
                    />
                    <input
                      type="text"
                      onChange={this.handleEditFriend}
                      placeholder="age"
                      name="age"
                      value={this.state.age}
                    />
                    <button onClick={() => this.updateFriend(_id)}>
                      Save Friend
                    </button>
                  </div>
                ) : null}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Friend.propTypes = {
  id: PropTypes.number
}

export default Friend;