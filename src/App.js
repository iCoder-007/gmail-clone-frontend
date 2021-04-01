
import axios from './axios';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import requests from "./requests";
import { useEffect, useState } from 'react';
import { useDataLayerValue } from "./DataLayer";
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import styled from 'styled-components';
import Inbox from './components/Inbox';
import HomeHeader from './components/HomeHeader';
import MailDetail from './components/MailDetail';
import Sent from './components/Sent';

function App() {
  const [{user},dispatach]= useDataLayerValue()
  let token=localStorage.getItem('token')
  const [cuser,setCUser]=useState(null)
  useEffect(() => {
   
  
  if(token){
  
    axios
    .post(
      requests.signinStatus,
      {
        token: `${token}`,

      },

      {
        crossorigin: true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      }
    )
    .then(function (response) {
      
      if (response.status === 200) {
        dispatach({
          type:'SET_USER',
          user:response.data["Response"]
        });
       setCUser(response.data["Response"])
      }
      else{
       
      }
    });
  }
}, [])
  return (
    <Router>
    <div className="App">
      {cuser==null?
   (<SignUp/>):(
     <AppBody>
                       <HomeHeader/>
       <div>
         <div className="left">
       <Home/></div>
       <div className="right">
<Switch>
  <Route path="/" exact component={Inbox}/>
  <Route path="/sent" exact component={Sent} />
  <Route path="/:id" component={MailDetail} />
       </Switch></div>
       </div>
     </AppBody>
   )
  }
    </div></Router>
  );
}

export default App;

const AppBody=styled.div`
::-webkit-scrollbar{
  background-color:#363636;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-button{
      display:none;
    }
    a{
      text-decoration:none;
    }
>div{
  display:flex;
  >.left{
    flex:.13;
    padding-right:2%;
  }
  >.right{
    flex:.85;
    height:88vh;
    overflow-y:scroll;
    overflow-x:hidden;
    padding-bottom:40px;

/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}}
}
`