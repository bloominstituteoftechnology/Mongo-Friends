import React from 'react';
import Friend from './Friend';
import './FriendCard.css'

class FriendList extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    // handleDetate = (e) => {
    //     this.props.onDelete(e.target.id);
    // };

    render() {
        return (
            <div className='FriendCard__list'>

                {this.props.friends.map((friend) => {
                    return <Friend friend={friend} onDelete={this.props.onDelete} key={friend._id}/>
                })}
            </div>
        );
    };
}

export default FriendList;