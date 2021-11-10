import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import Navi from "../common/Navi";
import {
  Button,
  FormControl,
  FormGroup,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

export default function CreateNewAdmin() {
  Axios.defaults.withCredentials = true;
  const [registered, setRegisterd] = useState(false);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState({
    // user_id: false,
    password: false,
    first_name: false,
    last_name: false,
    email_id: false,
    zip_code: false,
    street: false,
    city: false,
  });
  const defaultValues = {
    // user_id: "",
    password: "",
    first_name: "",
    last_name: "",
    email_id: "",
    zip_code: "",
    street: "",
    city: "",
    member_type: 0,
  };
  const [userDetails, setUserDetails] = useState(defaultValues);
  const history = useHistory();

  const register = () => {
    if (
      userDetails.password.trim().length < 5 ||
      userDetails.first_name.trim() === "" ||
      userDetails.last_name.trim() === "" ||
      userDetails.city.trim() === "" ||
      userDetails.street.trim() === "" ||
      userDetails.email_id.trim() === "" ||
      userDetails.zip_code.length < 5
    ) {
      setMessage("Please fill all fields");
    } else if (
      userDetails.email_id.includes(" ") ||
      userDetails.zip_code.includes(" ") ||
      userDetails.password.includes(" ")
    ) {
      setMessage("Space character not allowed in zip_code, password, email_id");
    } else {
      Axios.post("http://localhost:3001/admin/newadmin/create", {
        userDetails
      })
        .then((response) => {
          setMessage(
            'New Admin User ID is "' +
              response.data.user_id + '".');
          setRegisterd(true);
        })
        .catch((error) => {
          setMessage(error.response.data.err);
          setRegisterd(false);
        });
    }
  };

  const goBackToAdmin = () =>{
    history.push("/admin");
  }

  if (registered) {
    return (
      <div>
        <Navi></Navi>
        <h2 style={{ textAlign: "center" }}> {message}</h2>
        { registered && 
                <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={goBackToAdmin}>
                      Go to User List
                  </button>
                </div>
           }
      </div>
    )
  }

  return (
    <div>
      <Navi></Navi>
      <h1 style={{textAlign:"center"}}>Register New Admin</h1>
      <FormGroup>
        <FormControl>
          <TextField
            helperText={invalid.first_name ? "1-25 characters" : ""}
            id="register-first-name"
            label="First Name"
            type="text"
            required
            error={invalid.first_name}
            onChange={(e) => {
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, first_name: validation });
              setUserDetails({ ...userDetails, first_name: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            helperText={invalid.last_name ? "1-25 characters" : ""}
            id="register-last-name"
            label="Last Name"
            type="text"
            error={invalid.last_name}
            onChange={(e) => {
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, last_name: validation });
              setUserDetails({ ...userDetails, last_name: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            helperText="Minimum 5 characters"
            id="register-password"
            label="Password"
            type="password"
            error={invalid.password}
            onChange={(e) => {
              const validation =
                e.target.value.length < 5 ||
                e.target.value.length > 25 ||
                e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, password: validation });
              setUserDetails({ ...userDetails, password: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            helperText={invalid.email_id ? "1-25 characters" : ""}
            id="register-email-id"
            label="Email ID"
            type="text"
            error={invalid.email_id}
            onChange={(e) => {
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, email_id: validation });
              setUserDetails({ ...userDetails, email_id: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            helperText={invalid.street ? "1-25 characters" : ""}
            id="register-street"
            label="Street"
            type="text"
            error={invalid.street}
            onChange={(e) => {
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, street: validation });
              setUserDetails({ ...userDetails, street: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            helperText={invalid.city ? "1-25 characters" : ""}
            id="register-city"
            label="City"
            type="text"
            error={invalid.city}
            onChange={(e) => {
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, city: validation });
              setUserDetails({ ...userDetails, city: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            helperText="5 digit zip code"
            id="register-zip-code"
            label="ZIP Code"
            type="number"
            error={invalid.zip_code}
            onChange={(e) => {
              const validation =
                e.target.value.length !== 5 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, zip_code: validation });
              setUserDetails({ ...userDetails, zip_code: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <div>
          <div className="pure-u-1-6"></div>
          <Button variant="contained" color="primary" className="pure-u-1-6" onClick={register}>
            Register
          </Button>
          <div className="pure-u-1-6"></div>
          <Button variant="contained" color="primary" className="pure-u-1-6" onClick={history.goBack}>
            Cancel
          </Button>
          </div>
        </FormControl>
        {message && <Alert severity="error">{message}</Alert>}
      </FormGroup>
    </div>
  );
}
