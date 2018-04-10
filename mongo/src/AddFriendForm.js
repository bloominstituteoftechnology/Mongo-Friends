import React, { Component } from 'react';
import AddFriendWrapper from './primatives/AddFriendWrapper';
import styled from 'styled-components';
import Input from './primatives/Input';
import FormWrap from './primatives/FormWrap';

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
       this.handleLastNameInput = this.handleLastNameInput.bind(this);
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

    handleFirstNameInput(event) {
        this.setState({
            firstName: event.target.value
        });
    }

    handleLastNameInput(event) {
        this.setState({
            lastName: event.target.value
        });
    }

    handleAgeInput(event) {
        this.setState({
            age: event.target.value
        });
    }

    render() {
   

        
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
            <AddFriendWrapper>

                <form onSubmit={this.addFriend}>
                <FormWrap>
                    <Label>First Name</Label>  
                    <Input name="firstName" placeholder="First Name" onChange={this.handleFirstNameInput} value={this.state.firstName}/>
                    <Label>Last Name</Label>
                    <Input name="lastName" placeholder="Last Name" onChange={this.handleLastNameInput} value={this.state.lastName}/>
                    <Label>Age</Label>
                    <Input name="age" placeholder="Age" onChange={this.handleAgeInput} value={this.state.age}/>
                    <Button onSubmit={this.addFriend}>Submit</Button>
                </FormWrap>       
                </form>  
       
            </AddFriendWrapper>    

        )
    }
}

export default AddFriendForm;
