import React from 'react';
import FormWrapper from './FormWrapper';

export default class FriendForm extends React.Component {
  state = { Input: { firstName: '', lastName: '', age: '' } };

  handleInputChange = e => {
    const input = Object.assign(this.state.Input);
    input[e.target.name] = e.target.value;
    this.setState({ Input: input });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.Input); // changes the showForm state to false
    const input = { firstName: '', lastName: '', age: '' };
    this.setState({ Input: input });
  };

  render() {
    return (
      <FormWrapper onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleInputChange}
          type="text"
          name="firstName"
          placeholder="Enter the first name"
        />
        <input
          onChange={this.handleInputChange}
          type="text"
          name="lastName"
          placeholder="Enter the last name"
        />
        <input
          onChange={this.handleInputChange}
          type="number"
          name="age"
          placeholder="Enter the age"
        />
        <button> Add Friend </button>
      </FormWrapper>
    );
  }
}
