import React, { Component } from 'react';
import { Card, CardHeader } from 'reactstrap';

class FriendCard extends Component {
  render() {
    const { firstName, lastName, age } = this.props.friend;

    return (
      <Card>
        <CardHeader>
          {`${firstName} ${lastName} \n is ${age} years old.`}
        </CardHeader>
      </Card>
    );
  }
}

export default FriendCard;
