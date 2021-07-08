import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import './Friends.css';
import FriendForm from '../FriendForm/FriendForm';

const Friends = props => {
    return <div>
        <h1 className="friendsHeader">Friends List</h1>
        <FriendForm handleNewFriend={props.handleNewFriend} addFriend={props.addFriend} state={props.state} />
        <Container>
            <Row className="friendsRow">
                {props.friends.map(friend => {
                    console.log('friend', friend._id);
                    return <Link key={friend._id} to={`/friends/${friend._id}`} className="friendCard">
                        <Col sm="12">
                            <Card body>
                                <CardTitle>First Name: {friend.firstName}</CardTitle>
                                <CardText>Last name: {friend.lastName}</CardText>
                                <CardText>Age: {friend.age}</CardText>
                            </Card>
                        </Col>
                    </Link>;
                })}
            </Row>
        </Container>
    </div>;
}

Friends.propTypes = {
    friends: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            age: PropTypes.number
        })
    )
};

export default Friends;