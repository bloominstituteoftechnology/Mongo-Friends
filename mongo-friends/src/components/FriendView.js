import React, { Component } from 'react';
import { getFriend } from '../actions';
import { connect } from 'react-redux';
import './FriendView.css';
import { Link } from 'react-router-dom';

class FriendView extends Component {

    componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getFriend(id);
  }

  render() {
      console.log(this.props.id)
    return (
        <div className="mainList"><h3 className="headerfriends">Friend:</h3>
            <Link to={`/`} className="mainCard">
            <div className="friendCard">
                <div className="oneContent">{this.props.firstName}</div>
                <div className="oneTitle">{this.props.lastName}</div>
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