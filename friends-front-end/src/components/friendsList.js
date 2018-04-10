import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { CardCols } from 'reactstrap';
import { retrieve } from '../actions/retrieve';

class FriendsList extends Component {
  componentDidMount() {
    this.props.retrieve();
  }
  render() {
    console.log(this.props.friends, 'friends');
    return <div>This is the Friends List Component!</div>;
  }
}
const mapStateToProps = state => {
  return {
    friends: state.friends,
  };
};
export default connect(mapStateToProps, { retrieve })(FriendsList);
