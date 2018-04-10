import React, { Component } from 'react';
import axios from 'axios';


export default class NewUer extends Component {
    state = {
        friends: [],
        newfirst: '',
        newLast: '',
        newAge: Number,
        // newCont:{
        //     newE: '',
        //     cellNumber: '',
        //     userName: ''
        // },
    };

    


    // componentDidMount() {
    //     axios
    //         .get('http://localhost:5000/api/posts')
    //         .then(response => {
    //             this.setState(() => ({posts: response.data}));
    //         })
    // }

    addUser = (event) => {
        console.log(this.state)
        // event.preventDefault();
        const user = this.state.friends;
        axios
        .post('http://localhost:5000/api/friends', {firstName: this.state.newfirst, lastName: this.state.newLast,})
        .then(response => {{posts.push({firstName: this.state.newfirst, lastName: this.state.newLast,})
        console.log('Sub', response)
        this.setState({
                firstName: '',
                lastName: '',
                age: Number,
                // contactInfo:{
                //     email: '',
                //     cellNumber: '',
                //     userName: ''
                // },
                friends: friends
        })
        axios.get('http://localhost:5000/api/friends')
        .then(response => {
            this.setState({ friends: response.data })
        })
        }}
    )}

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

render() {
    return (
        <form className="new-form">
            <input name='newFirst' className='post-input post-input-title' type='text' onChange={(event) => this.handleChange(event)} placeholder='-[B]irst Name Here-' value={this.state.newfirst} />
            <input name='newLast' className='post-input post-input-text' type='text' onChange={(event) => this.handleChange(event)} placeholder='-[B]ast Name Here-' value={this.state.newLast} />
            <input name='newLast' className='post-input post-input-text' type='text' onChange={(event) => this.handleChange(event)} placeholder='-[B]ast Name Here-' value={this.state.newLast} />
            <button className='post-button' onClick={(event) => this.addPost(event)}>Submit</button>
        </form>
    )
}
    
}



