import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Logout = () => {
  Axios.defaults.withCredentials = true;
  const [loggedOut, setLoggedout] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      console.log("loggedout");
      setLoggedout(true);
    });
  }, []);
  if(loggedOut){
    return (
      <>
        <div className="main">
          <h1 style={{textAlign:"center"}}>Successfully logged out</h1>
        </div>
        <Link to="/" className="button-xlarge pure-button">Go to Home Page</Link>
      </>
    );
  }else{
    return <>Please try again.</>
  }
};

export default Logout;
