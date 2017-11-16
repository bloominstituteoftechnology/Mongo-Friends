import React from 'react';
import { connect } from 'react-redux';

import { getPosts } from '../actions';
import Posts from './Posts.js';

/*
const PostsContainer = () => (
  <Posts />
);
*/

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { getPosts })(Posts);