import React, { Component } from 'react';
import { getFriends } from '../actions';
import { connect } from 'react-redux';
import './FriendsList.css';
import { Link } from 'react-router-dom';

class FriendsList extends Component {
  
  componentDidMount() {
    this.props.getFriends();
  }

  render() {
    return (
        <div className="mainList"><h3 className="headerfriends">Friends:</h3>
          {this.props.friends.map(friend => <Link to={`/friends/${friend.id}`} key={friend.id} className="overall">
                                            <div key={friend.id} className="friendList">
                                                <div className="friendContent">{friend.firstName} {friend.lastName}</div>
                                                <hr></hr>
                                                <div className="friendTitle">{friend.age}</div>
                                                <hr></hr>
                                                <div className="friendTitle">{friend.contactInfo.phoneNum}</div>
                                                <hr></hr>
                                                <div className="friendTitle">{friend.contactInfo.email}</div>
                                            </div>
                                        </Link>)}<div><Link to='/create'><button className="button">+ Create New Friend</button></Link></div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    friends: state.friends,
    fetchingFriends: state.fetchingFriends,
    error: state.error
  };
};

export default connect(mapStateToProps, { getFriends })(FriendsList);