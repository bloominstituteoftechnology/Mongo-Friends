import React, { Component } from 'react';

import Post from './Post.js';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    const posts = this.props.getPosts();
    this.setState({ posts });
  }
  render() {
    return (
      <div className="posts_container">
        <h1>Blog Posts</h1>
        <div className="post_list">
          {this.props.posts.slice(0).reverse().map((post, i) => {
            return (
              <Post
                key={post._id}
                title={post.title}
                content={post.content}
                user={post.user}
                id={post._id}
                date={post.createdAt}
                delete={this.props.deletePost}
              />
            );
          })}
        </div>
      </div>
    );
  } 
}
export default Posts;