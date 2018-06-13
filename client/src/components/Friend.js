import React, { Component } from 'react';

class Friend extends Component {
    render() {
        // console.log('friend: ', this.props.friend);
        return (
            <div key={this.props.friend.id}>
                <h4><span>Name: {this.props.friend.lastName}, {this.props.friend.firstName}</span></h4>
                <p>Age: {this.props.friend.age}</p>
            </div>
        );
    }
}

export default Friend;