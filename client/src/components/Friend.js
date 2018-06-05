import React from "react";

class FriendForm extends React.Component {
    
    render() {
        return (
            <div className="friend" key={this.props.friend.id}>
                <h2>First Name: {this.props.friend.firstName}</h2>
                <h2>Last Name: {this.props.friend.lastName}</h2>
                <p>Age: {this.props.friend.age}</p>
            </div>
        )
    }
}

export default FriendForm;