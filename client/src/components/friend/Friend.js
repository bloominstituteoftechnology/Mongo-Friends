import React from 'react';
import {Card, CardHeader, CardBody, Button} from 'reactstrap'
import './FriendCard.css'
class Friend extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Card className='FriendCard'>
                    <CardHeader>{`${this.props.friend.firstName} ${this.props.friend.lastName}`}</CardHeader>
                    <CardBody>
                        <p>Age: {`${this.props.friend.age}`}</p>
                        <p>Email: {`${this.props.friend.contactInfo.email}`}</p>
                        <p>Phone: {`${this.props.friend.contactInfo.phone}`}</p>
                        <p>GitHub: {`${this.props.friend.contactInfo.gitHub}`}</p>
                        <Button onClick={this.props.onDelete} id={this.props.friend._id}>Delete</Button>
                    </CardBody>

                </Card>
            </div>
        );
    }
};

export default Friend;