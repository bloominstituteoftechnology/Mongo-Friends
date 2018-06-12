import React, { Component } from "react";
import { connect } from "react-redux";
import friendsReducer from "./friendsReducer";
import { fetchingFriendsActionCreator } from "./allActions";

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }
  componentDidMount = () => {
    fetchingFriendsActionCreator();
  };

  render() {
    console.log("fill", this.props.friends);

    return (
      <div>
        {this.props.friends.map((f, index) => {
          return (
            <div key={index}>
              <div> First Name :{f.firstName}</div>
              <div> Last name :{f.lastName}</div>
              <div> age : {f.age}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapDispatchToProps = state => {
  console.log("hill", state.friendsReducer);
  return {
    friends: state.friendsReducer
  };
};
export default connect(mapDispatchToProps, fetchingFriendsActionCreator)(
  FriendsList
);
