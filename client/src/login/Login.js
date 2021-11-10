import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { Redirect, useParams } from "react-router";
import { useLoginValidate } from "../common/Validate";
import Loading from "../common/Loading";
import Navi from "../common/Navi";
import Alert from "@material-ui/lab/Alert";
import {Snackbar } from "@material-ui/core";


export default function Login() {
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const { loading, userData } = useLoginValidate();
  const [open, setOpen] = useState(false);
  Axios.defaults.withCredentials = true;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      user_id: user_id,
      password: password,
    })
      .then((response) => {
        setLoginStatus(true);
      })
      .catch((error) => {
        setLoginStatus(false);
        setFailMsg(error.response.data.err);
        setOpen(true);
      });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  if (userData.user_id || loginStatus) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div>
      <Navi></Navi>
      <div className="pure-form" style={{ flexDirection: "column" }}>
        <div>
          <h1 style={{ textAlign: "center" }}>Login</h1>
        </div>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            placeholder="UserID..."
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            style={{ margin: "auto 8px" }}
          />
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ margin: "auto 8px" }}
          />
          <button
            className="pure-button pure-button-primary"
            onClick={login}
            style={{ margin: "auto 8px" }}
          >
            {" "}
            Login{" "}
          </button>
        </div>
        {/* <div> {failMsg}</div> */}
        <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {failMsg}
        </Alert>
      </Snackbar>
      </div>
    </div>
  );
}
