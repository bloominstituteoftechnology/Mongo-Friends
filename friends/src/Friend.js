import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: {

      }
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/friends/${this.props.match.params._id}`)
      .then(result =>
        // console.log(result)
        this.setState({ friend: result.data.requestedFriend })
      )
      .catch(err => console.log(err));
  }

  render() {
    return <div className="solo-card">
        <div className="card-body text-center">
          <Link to="/">
            <button className="btn btn-info home-btn">Home</button>
          </Link>
          <h3 className="card-title">
            Name: {this.state.friend.firstName} {this.state.friend.lastName}
          </h3>
          <p className="card-title">Age: {this.state.friend.age}</p>
        </div>
      </div>;
  }
}

export default Project;
