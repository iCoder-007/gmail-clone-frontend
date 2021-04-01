import React, { useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import requests from "../requests";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import axios from "../axios";
function SignUp() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      width: "415px",
    },
  }));
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const classes = useStyles();

  const password_valid = (e) => {
    if (details["password"] === e.target.value) {
      setError(false);
    } else {
      setError(true);
    }
  };
  const SignUp = () => {
    if (
      details["first_name"].length > 0 &&
      details["last_name"].length > 0 &&
      details["password"].length > 0 &&
      details["username"].length > 0
    ) {
      axios
        .post(
          requests.signupUrl,
          {
            username: `${details["username"]}`,
            first_name: `${details["first_name"]}`,
            last_name: `${details["last_name"]}`,
            password: `${details["password"]}`,
          },

          {
            crossorigin: true,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          }
        )
        .then(function (response) {
          if (response.status === 200) {
            localStorage.setItem("token", response.data["token"]);
          }
        });
    } else {
    }
  };

  const [check, setCheck] = useState(false);
  return (
    <div>
      <SignUpContainer>
        <SignUpInnerContainer>
          <Row>
            <SignUpLeft>
              <SignUpHeader>
                <SignUpHeaderImage>
                  <img src="/logo.svg" alt="" />
                </SignUpHeaderImage>
                <h5>Create your Account</h5>
                <p>to continue to Zmail</p>
              </SignUpHeader>
              <Row>
                <TextField
                  style={{ width: "200px", margin: "0 0 20px 0" }}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  className="input"
                  onChange={(event) =>
                    setDetails({ ...details, first_name: event.target.value })
                  }
                />
                <TextField
                  style={{ width: "200px", margin: "0 0 20px 15px" }}
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  className="input"
                  onChange={(event) =>
                    setDetails({ ...details, last_name: event.target.value })
                  }
                />
              </Row>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Username
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  onChange={(event) =>
                    setDetails({ ...details, username: event.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <p className="suffix">@zmail.com</p>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <Row>
                <TextField
                  style={{ width: "200px", margin: "20px 0 0 0" }}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  className="input"
                  type={check ? "text" : "password"}
                  onChange={(event) =>
                    setDetails({ ...details, password: event.target.value })
                  }
                />

                <TextField
                  style={{ width: "200px", margin: "20px 0 0 15px" }}
                  id="outlined-basic"
                  label="Confirm"
                  variant="outlined"
                  type={check ? "text" : "password"}
                  className="input"
                  error={error}
                  onChange={(e) => password_valid(e)}
                />
              </Row>
              <p className="password_hint">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
              <CheckBoxContainer>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check}
                      onChange={() => setCheck(!check)}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Show password"
                />
              </CheckBoxContainer>
              <Row>
                <Button color="primary">Sign in instead</Button>
                <Button
                  className="confirm"
                  variant="contained"
                  color="primary"
                  onClick={() => SignUp()}
                >
                  Confirm
                </Button>
              </Row>
            </SignUpLeft>
            <SignUpRight>
              <img src="/account.svg" alt="" />
            </SignUpRight>
          </Row>
        </SignUpInnerContainer>
      </SignUpContainer>
    </div>
  );
}

export default SignUp;

const SignUpContainer = styled.div`
  background-color: #fff;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const SignUpInnerContainer = styled.div`
  padding: 30px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;

  border: 1px solid lightgray;
  .suffix {
    font-size: 16px;
  }
  .password_hint {
    font-size: 12px;
    color: gray;
    text-align: start;
    margin: 6px;
  }
`;
const SignUpLeft = styled.div`
  flex: 0.7;
`;
const SignUpRight = styled.div`
  margin-left: 50px;
  > img {
    object-fit: contain;
    height: 240px;
  }
`;
const SignUpHeader = styled.div`
  h5 {
    text-align: start;
    font-size: 25px;
    font-weight: 400;
  }
  p {
    text-align: start;
    margin: 5px 0 20px 0;
    font-size: 15px;
  }
`;
const SignUpHeaderImage = styled.div`
  display: flex;
  margin-bottom: 15px;
  > img {
    width: 120px;
    object-fit: contain;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  .confirm {
    margin-left: auto;
  }
`;
const CheckBoxContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  padding-left: 5px; ;
`;
