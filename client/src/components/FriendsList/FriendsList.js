import React, { Component } from 'react';
import axios from 'axios';

import './FriendsList.css';

class FriendsList extends Component {
    state = {
        friends: []
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/friends')
            .then(friends => {
                this.setState({friends: friends.data})
            })
            .catch(error => {
                console.log(error)
            });
    }


    render() {
        return (
            <div>
                {this.state.friends.map(friend => {
                    return <div key={friend['_id']}>{friend.firstName}</div>
                })}
            </div>
        )
    }
}



export default FriendsList;