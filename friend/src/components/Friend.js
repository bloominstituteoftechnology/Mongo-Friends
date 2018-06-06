import React, { Component } from "react";
import axios from "axios";

class Friend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friend: {
                contactInfo: {}
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchUser(id);
    }

    fetchUser = id => {
        axios.get(`http://localhost:5000/api/friends/${id}`)
            .then(response => {
                this.setState({
                    friend: response.data
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { firstName, lastName, age } = this.state.friend;
        const { email, twitter_handle } = this.state.friend.contactInfo;
        return (
            <div>
                <div className="friend-card">
                    <div>
                        <h3>{firstName} {lastName}</h3>
                        <p>Age: {age}</p>
                        <h5 className="contact">Contact Info</h5>
                    </div>
                    <div>
                        <p>Email: {email}</p>
                        {twitter_handle ? 
                            <p>Twitter: <span className="twitter-handle">{twitter_handle}</span></p>  
                        : null}
                    </div>
                </div>
            </div>    
        );
    }
}

export default Friend;