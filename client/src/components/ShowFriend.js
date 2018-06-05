import React from "react";
import axios from "axios";

class ShowFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/friends/${this.props.match.params.id}`)
            .then(friend => {
                console.log(friend);
                this.setState({...this.state, user: friend.data})
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        console.log(this.state.user.contactInfo);
        return (
            <div>
                <h2>First Name: {this.state.user.firstName}</h2>
                <h2>Last Name: {this.state.user.lastName}</h2>
                <h2>Age: {this.state.user.age}</h2>
                <div className="user-info">
                    <h2>Contact Info: </h2>
                    {/* {this.state.user.contactInfo.email.length > 0 ? <p>Email: {this.state.user.contactInfo.email[0]}</p> : null}
                    {this.state.user.contactInfo.tel.length > 0 ? <p>Tel: {this.state.user.contactInfo.tel[0]}</p> : null} */}
                    {/* <p>{this.state.user.contactInfo.facebook}</p>
                    <p>{this.state.user.contactInfo.github}</p> */}
                    {/* <p>{this.state.user.contactInfo.twitter}</p> */}
                    {/* {this.state.user.contactInfo.facebook} */}
                    {this.state.user.contactInfor ? <p> {this.state.user.contactInfo.facebook}</p> : null}
                </div>
            </div>

        );
    }
}

export default ShowFriend;