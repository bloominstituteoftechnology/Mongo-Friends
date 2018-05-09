import React from 'react';

const ContactsDisplay = props => {
    return (
        <div>
            <h4>Email: {props.contact.email}</h4>
            <h4>Mobile Number: {props.contact.mobile_number}</h4>
            <h4>Github Username: {props.contact.github_username}</h4>
            <h4>Facebook Username: {props.contact.facebook_username}</h4>
            <h4>Twitter Handle: {props.contact.twitter_handle}</h4>
        </div>
    )
}
export default ContactsDisplay;