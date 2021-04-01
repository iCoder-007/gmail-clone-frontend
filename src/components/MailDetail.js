import React from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from '../axios';
import requests from '../requests';
const MailDetail = (props) => {
    let history = useHistory();
    let token = localStorage.getItem("token");
    const deleteMail=()=>{
    if (token) {
      axios
        .post(
          requests.deleteMail,
          {sno:props.location.state['sno']},
          {
            headers: {
              Authorization: "Token " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            history.goBack()       
          } else {
          }
        });
    }
    }
    return (
        <div>
           <MailDetailContainer>
               <Top>
               <IconButton aria-label="back" onClick={()=>history.goBack()}>
          <ArrowBackIcon  />
        </IconButton>
          <div></div>
               <IconButton aria-label="delete" onClick={deleteMail}>
          <DeleteIcon />
        </IconButton>
               </Top>
               <Body>
                   <p className="subject">{props.location.state['subject']}</p>
                   <Row>
                   <Avatar>{props.location.state['sender'][0]}</Avatar>
                   <div>
                       <p><b>{props.location.state['sender']} </b> {'<'}{props.location.state['sender']}@zmail.com{'>'}
                           </p>
                           <h6>to me</h6>
                   </div>
                   
                   </Row>
                   <p className="text">{props.location.state['text']}</p>
               </Body>
               </MailDetailContainer> 
        </div>
    )
}

export default MailDetail

const MailDetailContainer=styled.div`

`
const Top=styled.div`
display:flex;
border-bottom:.5px solid #E7E7E7;
>div{
width:40px;
height:5px;
}
`
const Body=styled.div`
>.subject{
    margin-left:60px;
    margin-top:20px;
    font-size:25px;
}
>.text{
    width:80%;
    font-size:14px;
    margin-top:12px;
padding:10px;
white-space: pre-line;
line-height:1.5;
}
`
const Row=styled.div`
display:flex;
align-items:center;
margin-top:40px;
>.MuiAvatar-root{
    background-color:#DFEAFF;
    color:black;
    font-size:30px;
    border:1.5px solid #556FFF;
}
div{
margin:0 5px ;
}
>div>p{
    font-size:11px;
    color:grey;
}
>div>p>b{
    font-size:16px;
    color:black;
    font-weight:500; 

}
h6{
    font-size:13px;
    color:grey; 
    font-weight:400; 
}
`