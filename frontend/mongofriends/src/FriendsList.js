import React, { Component } from 'react';
import axios from 'axios';

class FriendsList extends Component {
    state = {
       friends:[{}],
    };
    
    componentWillMount() {
        let promise = axios.get("http://localhost:5000/api/friends");

        promise
            .then(friends =>{
                console.log("data", friends.data);
                this.setState({
                    friends: friends.data,
                })
            })
            .catch(err =>{
                console.log(err);
            });
    }

    
        handleDelete = (id) => {
        let newState = (this.state.friends);
        newState.splice(id, 1);
        this.setState({friends: newState})
        }
    
    render() {
        console.log(this.state.friends);
        return (
            <div>
               <ul className="card-container">
                {this.state.friends.map(friend =>{
                    return(
                        <li className="card" key={friend.id + friend.firstName} >
                            <button className="delete-card hidden" id={friend.id} onClick={this.handleDelete}>&times;</button>
                            <div className="friend-info">
                            <h3>{friend.firstName} {friend.lastName}</h3>
                            <p>Age: {friend.age}</p>
                            </div>

                        </li>
                    )
                })}
                </ul> 
            </div>
        );
    }
}

export default FriendsList;
