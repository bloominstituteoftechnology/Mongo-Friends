import React, { Component } from 'react';
import Wrapper from './primatives/Wrapper';

import FriendsList from './FriendsList';
import FriendsListContainer from './FriendsListContainer';

class App extends Component {
  render() {
    return (
      <Wrapper >
        <FriendsListContainer>
          <FriendsList />
        </FriendsListContainer>  
      </Wrapper>
    );
  }
}

export default App;
