import React, { Component } from 'react';
import axios from 'axios';

class FriendsList extends Component {
    state = {
       friends:[{}]
    };
    
    componentWillMount() {
        let promise = axios.get("http://localhost:5000/api/friends");

        promise
            .then(friends =>{
                this.setState({friends: friends.data});
            })
    }
    
    render() {
        console.log(this.state.friends);
        return (
            <div>
               <ul className="card-container">
                {this.state.friends.map(friend =>{
                    return(
                        <li className="card"key={friend.id + friend.firstName}>
                            <h3>{friend.firstName} {friend.lastName}</h3>
                            <p>Age: {friend.age}</p>

                        </li>
                    )
                })}
                </ul> 
            </div>
        );
    }
}

export default FriendsList;
