import React, { Component } from 'react';
import axios from 'axios';
import { Card } from 'reactstrap';

class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            friends: []
         }
    }
    componentDidMount() {
        axios
        .get('http://localhost:5000/api/friends')
        .then(response => {
            console.log(response);
            this.setState({ friends: response.data });
        })
        .catch(error => {
            console.log("error:", error)
        })
    }

    render() { 
        return ( 
            <div>
                {this.state.friends.map(friend => (
                    console.log("friend:", friend)
                    
                ))}
                </div>
         )
    }
}
 
export default Friends;