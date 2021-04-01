import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import axios from "../axios";
import requests from "../requests";
const Compose = ({ status, handle,alert }) => {
  function getModalStyle() {
    return {
      bottom: `${0}%`,
      right: `${0}%`,
      transform: `translate(-${5}%, ${5}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 500,
      height: 610,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      border: "none",
      borderRadius: 10,
      outline: "none",
    },
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [mail, setMail] = useState({
    subject: "",
    text: "",
    to: "",
  });
  let token = localStorage.getItem("token");
  const sendMail = () => {
  
    if (
      mail["subject"].length > 0 &&
      mail["text"].length > 0 &&
      mail["to"].length > 10
    ) {
      axios
        .post(
          requests.addMail,
          {
            subject: `${mail["subject"]}`,
            text: `${mail["text"]}`,
            to: `${mail["to"]}`,
          },
          {
            headers: {
              Authorization: "Token " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            alert()
            handle()
          }
        });
    } else {
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p
        style={{
          backgroundColor: "#404040",
          color: "white",
          padding: 7,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        New Message
      </p>
      <Body>
        <ToContainer>
          <p>To</p>
          <input
            type="text"
            onChange={(event) => setMail({ ...mail, to: event.target.value })}
          />
        </ToContainer>
        <SubjectContainer>
          <input
            type="text"
            placeholder="subject"
            onChange={(event) =>
              setMail({ ...mail, subject: event.target.value })
            }
          />
        </SubjectContainer>
        <TextContainer>
          <textarea
            name=""
            id=""
            onChange={(event) => setMail({ ...mail, text: event.target.value })}
          ></textarea>
        </TextContainer>
        <Button variant="contained" color="primary" onClick={sendMail}>
          Send
        </Button>
      </Body>
    </div>
  );
  return (
    <div>
      <Modal
        open={status}
        onClose={handle}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default Compose;

const ToContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  color: grey;
  p {
    flex: 0.08;
    font-size: 15px;
  }
  > input {
    border: none;
    outline: none;
    padding: 5px;
    width: auto;
    flex: 0.92;
    font-size: 15px;
  }
`;
const Body = styled.div`
  margin: 2%;
  > button {
    margin-top: auto;
  }
`;
const SubjectContainer = styled.div`
  border-bottom: 1px solid #e7e7e7;
  margin-top: 10px;
  > input {
    border: none;
    outline: none;
    padding: 5px;
    width: auto;
    font-size: 15px;
    flex: 0.92;
  }
`;
const TextContainer = styled.div`
  border-bottom: 1px solid #e7e7e7;
  margin-top: 10px;
  > textarea {
    width: 96%;
    resize: none;
    height: 400px;
    border: none;
    outline: none;
    padding: 1%;

    font-size: 15px;
    flex: 0.92;
  }
`;
