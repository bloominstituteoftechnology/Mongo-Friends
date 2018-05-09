import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import FriendsDisplay from './components/FriendsDisplay';
import NewFriend from './components/NewFriend';
import ContactsDisplay from './components/ContactsDisplay';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends : [],
      contactData : []

    }
  }

  componentDidMount = () => {

    this.fetchData()
}
fetchData = () => {
    axios.get(`http://localhost:5000/api/friends/`)
    .then(res => {
        let frData = res.data;
        // console.log('response.data of updateFriends, cdm: ', res.data)
        this.setState({ friends: frData })
    });
    // this.fetchContacts()

}
fetchContacts = () => {
  axios.get(`http://localhost:5000/api/friends/${this.props.id}/contactInfo`)
  .then(res => {
      let frData = res.data;
      console.log('response.data of updateFriends, cdm: ', res.data)
      this.setState({ contactData: frData })
  });
}
  render() {
    // console.log('this is the state:', this.state.friends)
    return (
      <div className="App">
 
        <div>
          {/* {<NewFriend />} */}
          <NewFriend fetchData={() => this.fetchData()} />
          <h1>Friends </h1>
        {  this.state.friends.map((friend,i) => {return (<div key={friend + i} > < FriendsDisplay friend={friend} fetchData={() => this.fetchData()} /> </div> ) } ) }
                        {/* {this.state.contactData.map((contact,i) => {return (<div key={contact + i}> <ContactsDisplay contact={contact} fetchData={() => this.fetchData()} /> </div> ) })} */}

        </div>
      </div>
    );
  }
}

export default App;
