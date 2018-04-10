import React, { Component } from 'react';
import axios from 'axios';

class FriendsList extends Component {
    state = {
        friends: [],
    }
    render() {
        return (
            <div>
                {this.state.friends.map(friend => {
                    return (
                        <div key={friend._id}>
                            <h1>{friend.firstName} {friend.lastName}</h1>
                        </div>
                    )
                })}
            </div>
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
}

export default FriendsList;