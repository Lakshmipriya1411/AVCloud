import React from "react";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import UserList from "./UserList";
import PendingUserList from "./PendingUserList";
import StaffMembers from "./AdminUserList";

export default function ViewUserList() {
  const { loading, userData } = useLoginValidate();

  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }
  if (!userData.user_id) {
    return redirectLogin();
  } else if (userData.auth_id === 1) {
    return (
        <div>
        <Navi></Navi>
        <div className="pure-form pure-form-aligned">
          <h1 style={{textAlign:"center"}}>User List</h1>
          <UserList/>
          <br/>
          <br/>
          <PendingUserList/>
          <br/>
          <br/>
          <StaffMembers/>
        </div>
      </div>
    );
  } else {
    return redirectHome();
  }
}
