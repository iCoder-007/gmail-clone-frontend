import React from 'react'
import { TextField } from '@material-ui/core';
import styled from "styled-components";
function Textfield({label,width,margin,suffix}) {
    return (
        <div>
            <TextFieldContainer>
           <TextField style={{width:width,margin:margin}} id="outlined-basic" label={label} variant="outlined" className="input" /> 
            </TextFieldContainer>
        </div>
    )
}

export default Textfield

const TextFieldContainer=styled.div`
`;