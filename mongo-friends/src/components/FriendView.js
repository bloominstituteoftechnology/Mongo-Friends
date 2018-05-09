import React, { Component } from 'react';
import { getFriend } from '../actions';
import { connect } from 'react-redux';
import './FriendView.css';
import { Link } from 'react-router-dom';

class FriendView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getFriend(id);
  }

  render() {
      console.log(this.props.friend.contactInfo)
    return (
        <div className="mainList"><h3 className="headerfriends">Friend:</h3>
            <Link to={`/`} className="mainCard">
            <div className="friendCard">
                <div className="friendContent">{this.props.friend.firstName} {this.props.friend.lastName}</div>                                            <hr></hr>
                <div className="friendTitle">{this.props.friend.age}</div>
                {/* <div className="friendTitle">{this.props.friend.contactInfo}</div>
                <hr></hr>
                <div className="friendTitle">{this.props.friend.email}</div> */}
            </div>
            </Link>
        </div>
    );
  }
}

const mapStateToProps = state => {
    console.log(state.friend);
  return {
    friend: state.friend,
    fetchFriend: state.fetchFriend,
    error: state.error
  };
};

export default connect(mapStateToProps, { getFriend })(FriendView);