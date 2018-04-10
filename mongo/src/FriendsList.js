import React, { Component, Fragment } from 'react'
import axios from 'axios';

import Card from './primatives/Card'
import './primatives/Card.css'

class FriendsList extends Component {
    state = {
        friends: [],
    }


    componentDidMount() {
        this.getFriends();
    }
    
    getFriends() {
        axios.get('http://localhost:5000/api/friends')
        .then(response => this.setState({ friends: response.data }))
        .catch(error => console.log('Server Error', error))
    }

    render(){
      
        return(
            <Fragment>
                {this.state.friends.map((friend, i)=> {
                    return (
                    <Card className="hvr-buzz hvr-radial-in" key={i}>
                        
                        <p>first name: {friend.firstName}</p>
                        <p>last name: {friend.lastName}</p>
                        <p>age: {friend.age}</p>
                        <p>created on: {friend.createdOn.slice(5, 10)}{'-' + friend.createdOn.slice(0, 4)}</p>
                    </Card>  
                    )  
                })}
            </Fragment>    
        )
    }
}

export default FriendsList;