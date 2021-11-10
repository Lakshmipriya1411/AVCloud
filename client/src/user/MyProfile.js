import React, { useState } from "react";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Navi from "../common/Navi";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import ViewUserDetails from "../admin/ViewUserDetails";
import { useParams } from 'react-router-dom';


export default function MyProfile() {
  const { loading, userData } = useLoginValidate();
  let {id} = useParams();
  const history = useHistory();
  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }
  if (!userData.user_id) {
    return redirectLogin();
  }  else {
      history.push("/admin/users/details/" + userData.user_id);
      return null;
    }
    }

