import React, { Component } from 'react';
import axios from 'axios';

import './FriendsList.css';
import Friend from '../Friend/Friend';

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
            <div className="friends-container">
                {this.state.friends.map(friend => {
                    return <Friend friend={friend}/>
                })}
            </div>
        )
    }
}



export default FriendsList;