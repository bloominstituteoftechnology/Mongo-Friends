import React, { Component } from "react";
import axios from "axios";
import { Card, Col, CardColumns } from "reactstrap";

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/friends")
      .then(response => {
        console.log(response);
        this.setState({ friends: response.data });
      })
      .catch(error => {
        console.log("error:", error);
      });
  }

  render() {
    return (
      <div style={{ backgroundColor: "#c4d4ed", height: '700px' }}>
        <CardColumns style={{ display: "flex" }}>
          {this.state.friends.map(friend => (
            <Col sm="3">
              <Card
                style={{
                  fontSize: '1.3rem',
                  color: "#cbd0eb",
                  fontWeight: "bold",
                  backgroundColor: "#85a3d4",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  marginTop: "20px",
                  border: "2px solid grey",
                  boxShadow: "3px 3px 6px #44536b"
                }}
              >
                {friend.firstName}
                <br />
                {friend.lastName}
                <br />
                {friend.contactInfo.phone}
                <br />
                {friend.contactInfo.email}
              </Card>
            </Col>
          ))}
        </CardColumns>
      </div>
    );
  }
}

export default Friends;
