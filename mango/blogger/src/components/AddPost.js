import React, {Component} from 'react';
import { connect } from 'react-redux';

import { addPost } from '../actions';

class AddNewPost extends Component {
  render() {
    let title, content;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.props.addPost({ title: title.value, content: content.value });
        title.value = content.value = '';
      }}>
        Title:
        <input ref={node => title = node} placeholder="insert title" />
        <textarea ref={node => content = node} cols="30" rows="10"></textarea>
        <input type="submit" />
      </form>
    );
  }
}
export default connect(null, { addPost })(AddNewPost);