import React from "react";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { Link } from "react-router-dom";
import EventList from './EventList';
import PendingUserList from "./PendingUserList";
import ListofAvailableVenues from "./VenueList";
import UpgradeReqList from "./UpgradeReq";

export default function AdminHome() {
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
        <br/>
        <div className="pure-controls">
          <Link to="/admin/events/create" className="pure-button pure-button-primary margin10">Create New Event</Link>
          <Link to="/admin/users" className="pure-button pure-button-primary margin10">View All Users</Link>
          <Link to="/admin/newadmin/create" className="pure-button pure-button-primary">Add New Admin</Link>
          <Link to="/admin/venue/create" className="pure-button pure-button-primary margin10">Add New Venue</Link>
          <Link to="/registration" className="pure-button pure-button-primary margin10">Register New Member</Link>
        </div>
        <br/>
        <br/>
        <PendingUserList/>
        <br/>
        <br/>
        <UpgradeReqList/>
        <br/>
        <br/>
        <EventList/>
        <br/>
        <br/>
        <ListofAvailableVenues/>
      </div>
    );
  } else {
    return redirectHome();
  }
}
