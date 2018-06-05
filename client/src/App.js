import React, { Component } from 'react';
import './App.css';
/* --- */
import axios from 'axios';
import FriendForm from './FriendForm';
import { Route, Link } from 'react-router-dom';

class App extends Component {

  constructor() {
    super();
    this.state = {
      friends: [],
      loading: true,
    };
  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/api/friends')
      .then(friends => {
        console.log(friends);
        this.setState({ friends: friends.data, loading: false });
      })
      .catch(err => {
        console.log("CDM GET from /api/friends ERROR:",err);
      });
  }

  render() {
    return (
      <div className="App">
        <button className="b mh3 mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Make a new friend!</button>

        <Route exact path="/" render={() => {
          return (
            <div className="friend-list flex flex-wrap justify-content-center">
            {
              this.state.loading ? 
                <h2>Loading</h2>
                :
                this.state.friends.map(friend => {
                return <FriendCard key={friend["_id"]} friend={friend} />;
              })
            }
            </div>
          )}} />
      </div>
    );
  }
}

class FriendCard extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      friend: {},
    };
  }

  componentWillMount() {
    this.setFriend(this.props.friend);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.friend !== nextProps.friend) {
      this.setFriend(nextProps);
    }
  }

  setFriend = (friend) => {
    this.setState({ friend });
  };

  render() {
    const { firstName, lastName, age, contactInfo } = this.state.friend;
    const { email, mobileNumber, githubHandle } = contactInfo;
    console.log("FriendCard rendering");
    return (
      <article className="ma3 mw5 mw6-ns hidden ba mv4">
        <h1 className="f4 bg-near-black white mv0 pv2 ph3">{`${firstName} ${lastName}`}</h1>
        <div className="pa3 bt">
          <ul className="f6 f5-ns lh-copy measure mv0">
            <li>Age: {age}</li>
            <li>Email: {email}</li>
            <li>Mobile Number: {mobileNumber}</li>
            <li>GitHub Handle: {githubHandle}</li>
          </ul>
        </div>
      </article>
    )
  }
}

export default App;
