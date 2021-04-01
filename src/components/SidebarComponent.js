import React, { useState } from 'react'
import styled from 'styled-components'

const SidebarComponent = ({Icon,text,isActive}) => {
  const [selected, setSeleted] =useState( "inbox");

    return (
        <div >
           { isActive?
           ( <SidebarComponentContainerActive>
<Icon/>
<p>{text}</p>
            </SidebarComponentContainerActive>):
           ( <SidebarComponentContainer>
<Icon/>
<p>{text}</p>
            </SidebarComponentContainer>)}
        </div>
    )
}

export default SidebarComponent

const SidebarComponentContainer=styled.div`
display:flex;
padding:7px 20px;
align-items:center;
color:#2B2B2B;
font-size:14px;
border-top-right-radius:20px;
border-bottom-right-radius:20px;
cursor: pointer;
.MuiSvgIcon-root {
    font-size:21px;

}
 :hover {
    background-color:#f1f3f4;
}
>p{
    margin-left:19px;
}
`
const SidebarComponentContainerActive=styled.div`
display:flex;
padding:7px 20px;
align-items:center;
font-size:14px;
background-color:#FFEEF0;
color:#FD2D2D;
border-top-right-radius:20px;
border-bottom-right-radius:20px;
cursor: pointer;
.MuiSvgIcon-root {
    font-size:21px;

}
>p{
    margin-left:19px;
}
`