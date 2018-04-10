import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardColumns } from 'reactstrap';
import { retrieve } from '../actions/retrieve';
import FriendCard from './friendCard';

class FriendsList extends Component {
  componentDidMount() {
    this.props.retrieve();
  }
  render() {
    console.log(this.props.friends, 'friends');
    return (
      <CardColumns>
        {this.props.friends.map(friend => {
          return <FriendCard friend={friend} />;
        })}
      </CardColumns>
    );
  }
}
const mapStateToProps = state => {
  return {
    friends: state.friends,
  };
};
export default connect(mapStateToProps, { retrieve })(FriendsList);
