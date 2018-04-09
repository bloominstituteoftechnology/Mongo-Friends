import React, { Component, Fragment } from 'react'
import axios from 'axios';

import Card from './primatives/Card'

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
                    <Card key={i}>
                        <p>{friend.id}</p>
                        <p>{friend.firstName}</p>
                        <p>{friend.lastName}</p>
                        <p>{friend.age}</p>
                        <p>{friend.createdOn}</p>
                    </Card>  
                    )  
                })}
            </Fragment>    
        )
    }
}

export default FriendsList;