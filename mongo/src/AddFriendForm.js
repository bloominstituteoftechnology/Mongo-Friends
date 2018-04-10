import React, { Component } from 'react';
import Wrapper from './primatives/Wrapper';
import styled from 'styled-components';
import axios from 'axios';

class AddFriendForm extends Component {
   constructor(){
       super();
        this.state = {
            firstName: '',
            lastName: '',
            age: '',
        }

       this.addFriend = this.addFriend.bind(this);
       this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
       this.handleLastNameInput = this.handleFirstNameInput.bind(this);
       this.handleAgeInput = this.handleAgeInput.bind(this);
   }

    addFriend(){
        const { firstName, lastName, age } = this.state;
        
        axios.post('http://localhost:5000/api/friends', {
            firstName: firstName,
            lastName: lastName,
            age: age,
         
        }).then(res => {
            this.setState({
                firstName: '',
                lastName: '',
                age: '',
            })
        })
    }

    handleInput(event) {

        event.preventDefault();
        const { name, value } = event.target
       this.setState({
           [name]: value
       })
    }

    render() {
        const FormWrap = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        border: solid black;
`
        const Input = styled.input`
            width: 300px;
            height: 40px;
            margin: 10px;
        `
        const Button = styled.button`
            width: 10%;
            height: 30px;
        `
        const Label = styled.p`
            font-size: 1.7rem;
            color: white;
            font-weight: 900;
        `
        return(
            <Wrapper>

                <form onSubmit={this.addFriend}>
                  <FormWrap>
                    <Label>First Name</Label>  
                    <Input name="firstName" placeholder="First Name" onChange={this.handleFirstNameInput} value={this.state.firstName}/>
                    <Label>Last Name</Label>
                    <Input name="lastName" placeholder="Last Name" onChange={this.handleLastNameInput} value={this.state.lastName}/>
                    <Label>Age</Label>
                    <Input name="age" placeholder="Age" onChange={this.handleAgeInput} value={this.state.age}/>
                    <Button>Submit</Button>
                  </FormWrap>  
                </form>    
            </Wrapper>    

        )
    }
}

export default AddFriendForm;
