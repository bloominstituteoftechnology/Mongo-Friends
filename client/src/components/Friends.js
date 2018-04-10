import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

export default class Friends extends Component {
  state = {
    friends: []
  };

  getFriends = () => {
    axios
      .get('http://localhost:5000/api/friends')
      .then(response => {
        this.setState({ friends: response.data });
      })
      .catch(error => {
        console.log('There was an error getting friends');
      });
  };

  componentDidMount = () => {
    this.getFriends();
  };

  render() {
    return (
      <div className="mx-5">
        <Table hover bordered>
          <thead>
            <tr className="table-warning">
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          {this.state.friends.map(friend => {
            return (
              <tbody>
                <tr>
                  <td>{friend._id}</td>
                  <td>{friend.firstName}</td>
                  <td>{friend.lastName}</td>
                  <td>{friend.age}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    );
  }
}
