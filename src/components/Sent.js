import axios from "../axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InboxComponent from "./InboxComponent";
import requests from "../requests";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Checkbox, IconButton } from "@material-ui/core";
const Sent = () => {
  const [Sent, setSent] = useState([]);
  let token = localStorage.getItem("token");
 

  useEffect(() => {
    if (token) {
      axios
        .post(
          requests.sentMail,
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
            setSent(response.data["Response"]);           
          } else {
          }
        });
    }
  }, []);
 
  return (
    <div>
      <SentContainer>
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
          {Sent.map((inb) => (
            <InboxComponent key={inb["sno"]}
              sender={'To:'+inb["to"]}
              subject={inb["subject"]}
              text={inb["text"]}
              sno={inb["sno"]}
              isStarred={false}
            />
          ))}
        </Body>
      </SentContainer>
    </div>
  );
};

export default Sent;
const SentContainer = styled.div`
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
