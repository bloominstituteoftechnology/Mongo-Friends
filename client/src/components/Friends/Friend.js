import React, { Component } from 'react';
import axios from 'axios';

class Friend extends Component {
  state = {
    friends: [],
  }

  componentDidMount() {
    axios.get('/api/friends')
      .then(({ data }) => {
        this.setState({ friends: [ ...data ] });
      });
  }
  
  render() { 
    return (
      this.state.friends.map(friend => {
        const { 
          _id,
          firstName,
          lastName,
          age,
          contactInfo: {
            email,
            mobileNum,
            github,
            facebook,
            twitter
          }
        } = friend;
        
        return (
          <ul key={ _id }>
            <li>{ firstName } { lastName }</li>
            <li>{ age }</li>
            <li>{ email }</li>
            <li>{ mobileNum }</li>
            <li>{ github }</li>
            <li>{ facebook }</li>
            <li>{ twitter }</li>
          </ul>
        )
      })
    )
  }
}
 
export default Friend;