import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NewPost from './NewPost';

import './post.css';

export default class PostPage extends React.Component {
    state = {
        friends: [],
    };

    

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/friends')
            .then(response => {
                this.setState(() => ({friends: response.data}));
            })
            .catch(error => {
                console.error('Could Not Retrieve Posts', error)
            });
    }

    render() {
        return (
            <div>
            <h1 className='title title-B'>🅱️<div className='title title-rest'>acefook</div></h1>
            <NewPost />   
            <div className='post-list'>
                {this.state.friends.map(friend => (
                    <div className='post-container'>
                        <div className='post-title'>{friend.firstName}</div>
                        <div className='post-text'>{friend.lastName}</div>
                        <div className='post-text'>{friend.age}</div>
                    </div>
                    ))}
            </div>

            </div>
        )
    }
}

