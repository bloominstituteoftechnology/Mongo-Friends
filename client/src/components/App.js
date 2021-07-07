import React, { Component } from 'react'
import { Observable } from 'rxjs/Rx'
import 'rxjs/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import './App.css'
import FriendsList from './FriendsList'

const friend$ = Observable.ajax('http://localhost:5000/api/friends')
  .map(xhr => xhr.response)
  .do(console.log)

class App extends Component {
  render() {
    return (
      <div className="App">
        <FriendsList friend$={friend$} />
      </div>
    )
  }
}

export default App
