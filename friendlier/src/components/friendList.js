import React, { Component } from 'react';
import Friend from './friend.js';
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
        })
    }

    render() {
        return(
            <div className='row d-flex justify-content-around'>
                <h1 className='col-12 mb-3'>Be Friendlier!</h1>
                {this.state.friends.map((friend) => {
                    let email;
                    let phone;
                    if (!friend.contactInfo) {
                        email = "No Email!";
                        phone = "No Phone!";
                    }
                    else {
                        email = friend.contactInfo.email;
                        phone = friend.contactInfo.phone;
                    }
                    return <Friend firstName={friend.firstName} lastName={friend.lastName} age={friend.age} email={email} phone={phone} />
                })}
            </div>
        )
    }
}

export default Friends;