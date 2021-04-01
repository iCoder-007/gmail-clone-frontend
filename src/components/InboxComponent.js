import React, { useState } from "react";
import styled from "styled-components";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { Checkbox, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "../axios";
import requests from "../requests";
function InboxComponent({ sender, subject, text, sno, isStarred }) {
  let token = localStorage.getItem("token");
  const [star, setStar] = useState(false);
  const starMail = () => {
    if (token) {
      axios
        .post(
          requests.starMail,
          { sno: sno },
          {
            headers: {
              Authorization: "Token " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            setStar(true);
          } else {
          }
        });
    }
  };
  function subStr(str, len) {
    if (str.length > len) {
      return str.substr(0, len) + "...";
    }
  }

  return (
    <div>
      <InboxComponentContainer>
        <div className="left">
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <IconButton aria-label="refresh" onClick={starMail}>
            {isStarred || star ? (
              <StarIcon style={{ color: "#ECCD1B" }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </div>
        <Link
          to={{
            pathname: `/${sender}-${subject}`,
            state: { sender: sender, subject: subject, text: text, sno: sno },
          }}
        >
          <div className="right">
            <span className="sender">{sender}</span>
            <span className="subject">{subject}</span>
            <span className="text">{subStr(text, 200 - subject.length)}</span>
          </div>
        </Link>
      </InboxComponentContainer>
    </div>
  );
}

export default InboxComponent;

const InboxComponentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #e7e7e7;
  overflow-x: hidden;
  cursor: pointer;
  background: rgba(242, 245, 245, 0.8);
  .MuiButtonBase-root {
    margin-left: 0;
  }
  .left {
    display: flex;
  }
  .right {
    display: flex;
  }
  :hover {
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
      0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
    background: rgba(242, 245, 245, 0.3);
  }
  > .MuiSvgIcon-root {
    color: #c9c9c9;
    font-size: 20px;
  }
  .sender {
    margin: 0 35px 0 10px;
    font-weight: 600;
  }
  .subject {
    margin: 0 10px 0 0;
    font-weight: 500;
    white-space: nowrap;
  }
  .text {
    font-size: 14px;
    color: #707070;
    white-space: nowrap;
    overflow: hidden;
  }
`;
