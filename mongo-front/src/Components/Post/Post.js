import React,{Component} from 'react';
import axios from 'axios';

export default class Post extends Component{
  constructor(props){
    super(props);
    this.state={
      firstName:"",
      lastName:"",
      age:"",
    }
    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirst(event){
    this.setState({firstName:event.target.value});
  }

  handleLast(event){
    this.setState({lastName:event.target.value});
  }

  handleAge(event){
    this.setState({age:event.target.value});
  }

  handleSubmit(event){
    axios.post('http://localhost:5000/api/friends',{
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      age:parseInt(this.state.age),
    })
    .then(res=>{
      console.log('success',res);
    })
    .catch(err=>{
      console.log('err posting',err);
    });
    event.preventDefault();
  }

  render(){
    return(
    <div>
      <form onSubmit={this.handleSubmit}>
      <label>
        <input type="text" name="first" onChange={this.handleFirst} value={this.state.firstName}/>
      </label>
      <label>
        <input type="text" name="last" onChange={this.handleLast} value={this.state.lastName}/>
      </label>
      <label>
        <input type="text" name="age" onChange={this.handleAge} value={this.state.age}/>
      </label>
      <input type="submit" value="Submit"/>
      </form>
    </div>
    );
  }
}
