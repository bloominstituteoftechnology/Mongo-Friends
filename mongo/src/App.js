import React, { Component } from 'react';
import Wrapper from './primatives/Wrapper';
import styled from 'styled-components';

import FriendsList from './FriendsList';
import FriendsListContainer from './FriendsListContainer';


class App extends Component {

  render() {
    // const Button = styled.button`
    // position: absolute;
    // right: 0px;
    // bottom: 20px;
    // display: block;
    // height: 70px;
    // width: 5%;
    // margin: 3px;
    // border-radius: 50%;
    // font-weight: bold;

    // animation-name: slideInFromRight;
    // animation-duration: 1s;
    // animation-iteration-count: 1;

    // @keyframes slideInFromRight {
    //   from { transform: translate3d(200%, 0, 0); }
    //   to { transform: translate3d(0, 0, 0); }
    // }


    // &:active {
    // color: #305252;
    // background: white;
    // box-shadow: inset 0 0 5px 2px #305252;
    // }

    // &:focus {
    //     outline: 0;
    // }




    // `
    return (
      <Wrapper >
        <FriendsListContainer>
          <FriendsList />
        </FriendsListContainer>
        {/* <Button>+ Add Friend</Button>   */}
      </Wrapper>
    );
  }
}

export default App;
