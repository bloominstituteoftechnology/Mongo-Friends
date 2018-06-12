import React, { Component } from 'react';
import Friend from '/friend.js';
import axios from 'axios';

class Friends extends Component {
    state = {
        friends: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/friends')
        .then(ans => {
            this.setState({ friends: ans.data })
        })
        .catch(err => {
            console.log("There was an error");
            err;
        })
    }

    render() {
        return(
            <div className='row'>
                <h1 className='col-12'>Be Friendlier!</h1>
                {this.state.friends.map((friend) => {
                    return <Friend firstName={friend.firstName} lastName={friend.lastName} age={friend.age} contactInfo={friend.contactInfo} />
                })}
            </div>
        )
    }
}
