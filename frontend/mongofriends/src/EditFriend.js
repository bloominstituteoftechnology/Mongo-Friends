import React, { Component } from 'react';
import axios from 'axios';

class EditFriend extends Component {
    render() {
        return (
            <div className="create-friend-form">
                <div className="create-friend-header">
                <h3>Edit Friend</h3>
                </div>
                <div className="create-friend-body">
                    <div className="required-info-wrapper">
                        <div className="required-info">
                        <label className="label-form">* First Name:</label>
                        <input className="input-form" type="text" name="firstname" required/>
                        </div>
                        <div className="required-info">
                        <label className="label-form">* Last Name:</label>
                        <input className="input-form" type="text" name="lastname" required/>
                        </div>
                        <div className="required-info">
                        <label className="label-form">* Age:</label>
                        <input className="input-form age-info" type="number" name="age" required/>
                        </div>
                    </div>
                    <div className="contact-info-wrapper">
                        <label className="label-form contact-info">Contact Information:</label>
                    </div>
                    <div className="required-info">
                        <label className="label-form">E-mail Address:</label>
                        <input className="input-form" type="text" name="email" required/>
                    </div>
                    <div className="required-info">
                        <label className="label-form">Cell Phone:</label>
                        <input className="input-form" type="text" name="cell" required/>
                    </div>
                    <div className="required-info">
                        <label className="label-form">GitHub Username:</label>
                        <input className="input-form" type="text" name="github" required/>
                    </div> <div className="required-info">
                        <label className="label-form">Facebook Username:</label>
                        <input className="input-form" type="text" name="facebook" required/>
                    </div> <div className="required-info">
                        <label className="label-form">Twitter Handle:</label>
                        <input className="input-form" type="text" name="twitter" required/>
                    </div>
                    <div className="button-submit">Update</div>
                </div>
            </div>
        );
    }
}

export default EditFriend;
