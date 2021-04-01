import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InboxComponent from "./InboxComponent";
import requests from "../requests";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Checkbox, IconButton } from "@material-ui/core";
const Inbox = () => {
  const [inbox, setInbox] = useState([]);
  let token = localStorage.getItem("token");
 

  useEffect(() => {
    if (token) {
      axios
        .post(
          requests.fetchInbox,
          {},
          {
            headers: {
              Authorization: "Token " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            setInbox(response.data["Response"]);           
          } else {
          }
        });
    }
  }, []);
 
  return (
    <div>
      <InboxContainer>
        <div className="top">
        <IconButton aria-label="refresh" >
          <RefreshIcon />
          
        </IconButton>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>

        <Body>
          {inbox.map((inb) => (
            <InboxComponent key={inb[1]["sno"]}
              sender={inb[0]["username"]}
              subject={inb[1]["subject"]}
              text={inb[1]["text"]}
              sno={inb[1]["sno"]}
              isStarred={inb[1]["isStarred"]}
            />
          ))}
        </Body>
      </InboxContainer>
    </div>
  );
};

export default Inbox;
const InboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  a{
    text-decoration:none;
    color:black;
  }
  .top {
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid #e7e7e7;
    padding: 5px 0;
  }
  > .top > .MuiSvgIcon-root {
    color: grey;
    margin-left: 20px;
    cursor: pointer;
  }
  .MuiButtonBase-root {
    margin-left: 15px;
  }
  .MuiAlert-standardSuccess {
    border: 1px solid #69d65c;
  }
`;
const Body = styled.div`
  flex: 0.85;
`;
