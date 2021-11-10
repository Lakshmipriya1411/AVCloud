import axios from "axios";
import { useEffect, useState } from "react";

export const useLoginValidate = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn === true) {
          setUserData(response.data.user);
        } else {
          setUserData({});
        }
        setLoading(false);
    });
  }, []);

  return { loading, userData };
};
