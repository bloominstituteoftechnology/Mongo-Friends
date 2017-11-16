import { connect } from 'react-redux';

import { getPosts, getPost, deletePost, } from '../actions';
import Posts from './Posts.js';

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { getPosts, getPost, deletePost, })(Posts);