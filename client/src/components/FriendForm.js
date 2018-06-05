import React from "react";

class FriendForm extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            age: ""
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addFriend(this.state);
        this.setState({firstName: "", lastName: "", age: ""});
    }

    render() {
        return (
            <div className="friend-form">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        name="firstName"
                        value={this.state.firstName}
                        placeholder="First Name"
                        onChange={this.handleInput}
                        required
                    />
                    <input 
                        name="lastName"
                        value={this.state.lastName}
                        placeholder="Last Name"
                        onChange={this.handleInput}
                        required
                    />
                    <input 
                        name="age"
                        value={this.state.age}
                        placeholder="Age"
                        onChange={this.handleInput}
                        required
                        type="number"
                    />
                    <button>Add Friend</button>
                </form>
            </div>
        )
    }
}

export default FriendForm;