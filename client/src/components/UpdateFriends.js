import React from 'react';
import axios from 'axios';
let cstyle;
class UpdateFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            friend: {},
            edit: false

        }
    }
    componentDidMount = () => {

        this.fetchData()
    }
    fetchData = () => {
        axios.get(`http://localhost:5000/api/friends/${this.props.id}`)
            .then(res => {
                let frData = res.data;
                // console.log('response.data of updateFriends, cdm: ', res.data)
                this.setState({ friends: frData })
            });
    }
    handleTextInput = (e) => {
        e.preventDefault()
        const state = this.state.friend
        state[e.target.name] = e.target.value;
        this.setState({ friend: state });
    };
    callToUpdate = () => {
        let { firstName, lastName, age } = this.state.friend;
        // console.log('the friend object is: ', friend)
        if (this.state.edit === false) {
            cstyle = {
                color: 'red'
            }
            this.setState({ edit: !this.state.edit })
        } else {
            cstyle = {
                color: 'blue'
            }
            this.setState({ edit: !this.state.edit })

        }
        age = parseInt(age);
        axios.put(`http://localhost:5000/api/friends/${this.props.id}`, { firstName, lastName, age })
            .then(res => {
                this.setState({ friend: {} })
                this.props.fetchData()
               
            })
            .catch((err) => {
                console.log(err);
            });

    };
    callToDelete = () => {
        axios.delete(`http://localhost:5000/api/friends/${this.props.id}`)
            .then((result) => {
                this.props.fetchData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>



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
                <button onClick={this.callToUpdate} >
                    Save Friend Details
							</button>
                <button onClick={this.callToDelete} >
                    Delete Friend
                    </button>

            </div>
        )
    }

}

export default UpdateFriends