import React from 'react';
import FormWrapper from './FormWrapper';

export default class FriendForm extends React.Component {
  render() {
    return (
      <FormWrapper>
        <input
          type="text"
          name="firstName"
          placeholder="Enter the first name"
        />
        <input type="text" name="lastName" placeholder="Enter the last name" />
        <input type="number" name="age" placeholder="Enter the age" />
        <button> Add Friend </button>
      </FormWrapper>
    );
  }
}
