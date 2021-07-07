import React, { Component } from 'react';
import { Button } from 'reactstrap';

import EditFriend from '../EditFriend/EditFriend';

class Friend extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.friend.firstName}</td>
                <td>{this.props.friend.lastName}</td>
                <td>{this.props.friend.age}</td>
                <th scope="row">
                    <Button onClick={() => this.props.deleteFriend(this.props.parent, this.props.friend._id)}>Unfriend</Button></th>
            </tr>

        );
    }
}

export default Friend;