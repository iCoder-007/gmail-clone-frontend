import React from 'react'
import styled from "styled-components";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import { useDataLayerValue } from "../DataLayer";
import { Avatar, Tooltip, Typography, withStyles } from '@material-ui/core';
const HomeHeader = () => {
    const [{ user }, dispatach] = useDataLayerValue();
    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
          backgroundColor: '#000000D0',
          color: 'white',
          maxWidth: 220,
          paddingLeft:15,
          paddingRight:15,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }))(Tooltip);
    return (
        <div>
            <HomeHeaderContainer>
                <HeaderLeft>
                    <MenuIcon/>
                <img src="/logo.svg" alt="" />
                </HeaderLeft>
                <HeaderMid>
                    <SearchBox>
<SearchIcon/>
<input/>
                    </SearchBox>
                </HeaderMid>
                <HeaderRight>
                    
                    <HelpOutlineIcon/>
                    <SettingsIcon/>
                    <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Zmail Account</Typography>
            <p>{user["first_name"]} {user["last_name"]} <br/>{user["username"]}@zmail.com</p>
           
          </React.Fragment>
        }
      >
                    <Avatar style={{backgroundColor:'#EE705A',cursor:'pointer'}} alt={user["first_name"]} src="hj" />
                    </HtmlTooltip>
                </HeaderRight>
            </HomeHeaderContainer>
        </div>
    )
}

export default HomeHeader
const HomeHeaderContainer=styled.div`
padding:10px 1%;
width:98%;
display:flex;
border-bottom:.5px solid #E7E7E7;
/* box-shadow:inset 0 -1px 0 rgb(100 121 143 / 12%); */
`
const HeaderLeft=styled.div`
flex:.15;
display:flex;
align-items:center;
padding-right:5px;
>.MuiSvgIcon-root{
    cursor: pointer;
}
>img{
height:30px;
margin-left:20px;
object-fit:contain;
}
`
const HeaderMid=styled.div`
flex:0.7;
`
const SearchBox=styled.div`
display:flex;
align-items:center;
background-color:#f1f3f4;
width:65%;
min-width:300px;
padding:5px;
padding-left:20px;
border-radius:5px;
> .MuiSvgIcon-root{
    font-size:30px;
    font-weight:400;
    color:#525252;
}
>input{
    padding:10px;
    background:transparent;
    border:none;
    flex:.8;
    outline: none;
}
`
const HeaderRight=styled.div`
display:flex;
margin-left:auto;
align-items:center;
>.MuiSvgIcon-root{
    margin-right:25px;
    font-size:25px;
    color:#525252;
    cursor:pointer;
}
`