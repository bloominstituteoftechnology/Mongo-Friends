import React from "react";
import { Link } from "react-router-dom";

class FriendForm extends React.Component {
    
    render() {
        return (
            <div className="friend" key={this.props.friend.id}>
                <div className="name-age">
                    <Link to={`/friends/${this.props.friend._id}`}>
                        <h4>First Name: {this.props.friend.firstName}</h4>
                        <h4>Last Name: {this.props.friend.lastName}</h4>
                        <h4>Age: {this.props.friend.age}</h4>
                    </Link>
                </div>
                <div className="contact-info">
                    <h4>Contact Info:</h4>
                    <p>Emails: {this.props.friend.contactInfo[0]}</p>
                    <p>Tel: {this.props.friend.contactInfo[0]}</p>
                    <p>GitHub: {this.props.friend.contactInfo.github}</p>
                    <p>Facebook: {this.props.friend.contactInfo.facebook}</p>
                    <p>Twitter: {this.props.friend.contactInfo.twitter}</p>
                </div>
            </div>
        )
    }
}

export default FriendForm;