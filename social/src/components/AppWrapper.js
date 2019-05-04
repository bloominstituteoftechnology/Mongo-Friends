import styled from 'styled-components';

export default styled.div`
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #eee;
  border-radius: 10px
  padding: 10px;

  h3 {
    font-size: 2rem;
    color: #999;
    border-bottom: 2px solid #eee;
  }

  p{
    font-family: sans-serif;
    font-weight: bold;
  }
  button {
    background-color: lightblue;
    margin: 10px;
    color: white;
    font-size: 1.5rem;
    border-radius: 10px;
    :hover {
      color: #fff;
      background-color: blue;
      cursor: pointer;
    }
  }
`;
