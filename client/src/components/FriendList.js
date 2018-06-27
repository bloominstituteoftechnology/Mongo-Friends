import React, { Component } from 'react';
import Friend from './Friend';

class FriendList extends Component {
    render() {
        // console.log('props: ', this.props)
        return (
            <div>
                {this.props.friends.map(friend => {
                    return (
                        <div key={friend.id}>
                            <Friend friend={friend}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default FriendList;