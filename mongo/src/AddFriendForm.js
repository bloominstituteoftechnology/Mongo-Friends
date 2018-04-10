import React, { Component } from 'react';
import Wrapper from './primatives/Wrapper';
import styled from 'styled-components';

class AddFriendForm extends Component {

    render() {
        const FormWrap = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        border: solid black;
`
        const Input = styled.input`
            width: 300px;
            height: 60px;
            margin: 10px;
        `

        return(
            <Wrapper>

                <form>
                  <FormWrap>  
                    <Input />
                    <Input />
                    <Input />
                  </FormWrap>  
                </form>    
            </Wrapper>    

        )
    }
}

export default AddFriendForm;
