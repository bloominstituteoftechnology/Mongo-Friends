import React, { Component } from 'react';
import {
    Row,
    Col,
    Table,
    Button,
} from 'reactstrap';
import axios from 'axios';

import Friend from '../Friend/Friend';
import EditFriend from '../EditFriend/EditFriend';

class FriendsList extends Component {
    state = {
        friends: [],
    }
    render() {
        return (
            <Row>
                <Col>
                    <Table dark>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Not Friends?</th>
                            </tr>
                        </thead>
                            {this.state.friends.map(friend => {
                                return (
                                <tbody>
                                <Friend key={friend._id} friend={friend}
                                parent={this}
                                deleteFriend={this.deleteFriend}/>
                                <EditFriend friend={friend}/>
                                </tbody>
                                )
                            })}
                    </Table>
                </Col>
            </Row>
        );
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/friends')
            .then(response => {
                this.setState({
                    friends: response.data,
                });
            }).catch(err => console.log(err));
    }

    deleteFriend(component, id) {
        axios
            .delete(`http://localhost:5000/api/friends/${id}`)
            .then(response => {
                console.log(response);
                component.componentDidMount();
            })
            .catch(error => console.log(error));
    }
}

export default FriendsList;