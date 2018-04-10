import React, { Component } from 'react';

import axios from 'axios';

class ContactInfo extends Component {
  constructor() {
    super();
    this.state = {
      contactInfo: []
    };
  }

  componentDidMount() {
    // const id = this.props.match.params.id;

    axios
      .get(`http://localhost:5000/api/friends/5acd200c83faf307fd4b4c02/contactInfo`)
      .then(response => {
        this.setState({ contactInfo: response.data });
      })
      .catch(error => {
        console.log(`There was an error connecting to the server: ${error}`);
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.contactInfo.map((contactInfo, index) => {
            return <li key={index}>{contactInfo.githubUserName}</li>;
            //id of 1 => actions from id of 1 should be displayed
            //match an id then go to its actions
          })}
        </ul>
      </div>
    );
  }
}

export default ContactInfo;
