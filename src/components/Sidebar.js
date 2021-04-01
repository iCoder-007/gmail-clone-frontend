import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import SidebarComponent from "./SidebarComponent";
import InboxIcon from "@material-ui/icons/Inbox";
import StarIcon from "@material-ui/icons/Star";
import SendIcon from "@material-ui/icons/Send";
import DraftsIcon from "@material-ui/icons/Drafts";

import Compose from "./Compose";
import MuiAlert from "@material-ui/lab/Alert";

import { Snackbar } from "@material-ui/core";
import { Link } from "react-router-dom";
function Sidebar() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };
  const handleSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(!openAlert);
  };
  const [selected, setSeleted] = useState("inbox");

  return (
    <div>
      <SidebarContainer>
        <div className="compose" onClick={handleModal}>
          <AddIcon />
          <p>Compose</p>
        </div>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleSnackbar}
        >
          <Alert onClose={handleSnackbar} severity="success">
            Mail Sent!
          </Alert>
        </Snackbar>
        <Compose handle={handleModal} status={open} alert={handleSnackbar} />
        <Link
          to={{
            pathname: `/`,
          }}
          onClick={() => setSeleted("inbox")}
        >
          <SidebarComponent
            Icon={InboxIcon}
            text="Inbox"
            isActive={selected === "inbox"}
          />
        </Link>
        <SidebarComponent
          Icon={StarIcon}
          text="Starred"
          isActive={selected === "starred"}
        />
        <Link
          to={{
            pathname: `/sent`,
          }}
          onClick={() => setSeleted("sent")}
        >
          <SidebarComponent
            Icon={SendIcon}
            text="Sent"
            isActive={selected === "sent"}
          />
        </Link>
        <SidebarComponent
          Icon={DraftsIcon}
          text="Draft"
          isActive={selected === "draft"}
        />
      </SidebarContainer>
    </div>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  width: 100%;
  .compose {
    margin: 10px 0 20px 10px;
    border-radius: 30px;
    width: 140px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%),
      0 1px 3px 1px rgb(60 64 67 / 15%);
    cursor: pointer;
    transition: box-shadow 0.08s linear,
      min-width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .compose:hover {
    box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%),
      0 4px 8px 3px rgb(60 64 67 / 15%);
  }
  .compose > .MuiSvgIcon-root {
    color: #9204e4;
    font-size: 50px;
    margin-right: 7px;
  }
  .newmessage {
    background-color: black;
  }
`;
