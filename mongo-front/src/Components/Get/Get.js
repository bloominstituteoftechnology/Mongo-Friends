import React, {Component} from 'react';
import axios from 'axios';
import "./Get.css";

class Get extends Component{
  constructor(props){
    super(props);
    this.state = {
      response:""
    };
  }
  componentDidMount(){
    axios.get('http://localhost:5000/api/friends')
    .then(res=>{
      this.setState({response:res});
    })
    .catch(err=>{
      this.setState({response:err});
    });
  }
  render(){
    console.log(this.state.response);
    if(this.state.response){
      let friends = this.state.response.data.friends
      return(
      <div>
      {friends.map( (e,i)=>{
        return (
        <div className="person" key={i}>
          <p>{e.firstName}</p>
          <p>{e.lastName}</p>
          <p>{e.createdOn}</p>
        </div>
        )
        })
      }
      </div>
      )
    }
    // no friends 
    else{
      return (
      <p>No friends found</p>
      );
    }
  }
}

export default Get;
