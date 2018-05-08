import React, { Component } from 'react'

class FriendsListContainer extends Component {
  state = { friends: [] }

  componentDidMount() {
    this.props.friend$.subscribe(friends => this.setState({ friends }))
  }

  render() {
    return <FriendsList friends={this.state.friends} />
  }
}

const FriendsList = ({ friends }) => friends.map(friend => <Friend {...friend} />)

const Friend = ({ firstName }) => <h1>{firstName}</h1>

export default FriendsListContainer