import React from 'react';

const Post = (props) => (
  <div className="post">
    <h3>{props.title}</h3>
    <p>{props.content}</p>
  </div>
);
export default Post;