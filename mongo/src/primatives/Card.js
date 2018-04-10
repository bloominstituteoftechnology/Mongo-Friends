import styled from 'styled-components';

export default styled.div`
    width: 300px;
    height: 300px;
    border: thick solid #4C3549;
    background: #DF367C;
    margin: 10px;
    border-radius: 50%;
    color: #4C3549;
    font-weight: 900;

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;


    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;

    p {
        font-size: 2.5rem;
    }
`