import React from 'react';

const Post = (props) => (
  <div className="post">
    <h3>{props.title}</h3>
    <p>{props.content}</p>
    <span>{props.date}</span>
    <button onClick={() => {props.delete(props.id)}}>DELETE</button>
  </div>
);

export default Post;