import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NewFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friend: {}

        }
    }
    handleTextInput = (e) => {
        // this.setState({ [e.target.name]: e.target.value });
        e.preventDefault()
        const state = this.state.friend
        state[e.target.name] = e.target.value;
        this.setState({friend:state});
    };
    saveFriendData = () => {
        let {firstName, lastName, age} = this.state.friend;
        age = parseInt(age);
        axios.post(`http://localhost:5000/api/friends/`, {firstName, lastName, age})
            .then(res => {
                this.setState({ friend: {}})
                // this.props.history.push("/show/"+this.props.match.params.id)
                this.props.fetchData()
                //   let frData = res.data;
                //   console.log('response.data of project: ', res.data)
                //   this.setState({ friends: frData })
            })
            .catch((err) => {
                console.log(err);
            });
	};

    render() {
        return (
            <div>
                <h5 >Create New Friend </h5>
                <input
                    type="text"
                    onChange={this.handleTextInput}
                    placeholder="First Name"

                    name="firstName"
                    value={this.state.friend.firstName}
                />
                <input
                    type="text"
                    onChange={this.handleTextInput}
                    // placeholder={email}
                    placeholder="Last Name"

                    name="lastName"
                    value={this.state.friend.lastName}
                />
                <input
                    type="text"
                    onChange={this.handleTextInput}
                    // placeholder={age}
                    placeholder="Age"

                    name="age"
                    value={this.state.friend.age}
                />
                <button onClick={this.saveFriendData} >
                    Save New Friend
							</button>
				{/* </div> */}
            </div>
        )
    }
}
export default NewFriend;

