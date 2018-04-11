import styled from 'styled-components';

export default styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 0 10px 20px;
    color: #aaa;
    font-size: 1.1rem;
    font-family: sans-serif;
    opacity: 0.6;
    border-radius: 5px;
    :focus {
      color: black;
      opacity: 1;
      border-radius: 0;
    }
  }
  button {
    width: 40%;
  }
`;
