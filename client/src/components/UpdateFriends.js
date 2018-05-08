import React from 'react';
import axios from 'axios';
let cstyle;
class UpdateFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // update: [],
      
            // Email: [],
            // firstName: [],
            // lastName: [],
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
            console.log('response.data of updateFriends, cdm: ', res.data)
            this.setState({ friends: frData })
        });
    }
    handleTextInput = (e) => {
        // this.setState({ [e.target.name]: e.target.value });
        e.preventDefault()
        const state = this.state.friend
        state[e.target.name] = e.target.value;
        this.setState({friend:state});
    };
    callToUpdate = () => {
        // const friend = { 'firstName': this.state.Name, 'lastName': this.state.lastName, 'age': parseInt(this.state.age) };
        let {firstName, lastName, age} = this.state.friend;
        // console.log('the friend object is: ', friend)
        if (this.state.edit === false) {
            cstyle = {
                color: 'red'
            }
            this.setState({edit: !this.state.edit})
        } else {
            cstyle = {
                color: 'blue'
            }
            this.setState({edit: !this.state.edit})

        }
        age = parseInt(age);
        // `http://localhost:5000/api/friends`)
        axios.put(`http://localhost:5000/api/friends/${this.props.id}`, {firstName, lastName, age})
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



        // const friend = { name: this.state.Name, email: this.state.Email, age: this.state.age };
        // axios
        //     .put(`http://localhost:5000/friends/${FriendID}`, friend)
        //     .then((response) => {
        //         this.props.getAJAX();
        //         this.setState({ showUpdateNote: false});
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }
    render() {
        return (
            <div>



                <h5 style={cstyle}>Edit friends </h5>
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

            </div>
        )
    }

}

export default UpdateFriends