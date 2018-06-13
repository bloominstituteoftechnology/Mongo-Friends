import React, { Component } from 'react';

class CreateFriend extends Component {
    render() {
        return (
            <div className="create-friend-form">
                <div className="create-friend-header">
                <h3>Enter New Character Into Database</h3>
                </div>
                <div className="create-friend-body">
                    <div className="form">
                        <label className="label-form">First Name:</label>
                        <input className="input-form" type="text"/>
                    </div>
                    <div className="form">
                        <label className="label-form">Last Name:</label>
                        <input className="input-form" type="text"/>
                    </div>
                    <div className="form">
                        <label className="label-form">Age (in yrs):</label>
                        <input className="input-form" type="number"/>
                    </div>
                    <div className="button-submit">Submit</div>
                </div>
            </div>
        );
    }
}

export default CreateFriend;
