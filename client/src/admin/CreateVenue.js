import React, { useEffect, useState } from "react";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "../App.css";
import VenueTypeDropdown from "./VenueType";



export default function CreateVenue() {
  const { loading, userData } = useLoginValidate();
  const defaultValues = {
    venue_name: "",
    venue_type: "",
  };
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [venueDetails, setVenueDetails] = useState(defaultValues);


  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }
  if (!userData.user_id) {
    return redirectLogin();
  } else if (userData.auth_id === 1) {

    Axios.defaults.withCredentials = true;

    const setVenuetypedetails = (venuetype) => {
      setVenueDetails({ ...venueDetails, venue_type: venuetype });
    }


    const createVenue = () => {

      Axios.post("http://localhost:3001/admin/venue/create", {
        venueDetails,
      })
        .then((response) => {
          setMessage("Venue added successfully.");
          history.push("/admin");
        })
        .catch((error) => {
          setMessage(error.data ? error.data.err : "Please enter valid data");
        });

    };

    return (
      <div>
        <Navi></Navi>
        <div className="pure-form pure-form-aligned">
          <h1 style={{ textAlign: "center" }}>Create Event</h1>

          <div className="pure-u-1-3"></div>

          <div className="pure-u-1-3">

            <div className="pure-control-group">
              <label htmlFor="aligned-description">Venue Name</label>
              <input
                type="text"
                id="aligned-description" placeholder="Venue Name"
                onChange={(e) => {
                  setVenueDetails({ ...venueDetails, venue_name: e.target.value });
                }}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="aligned-venue">Venue Type</label>
              <VenueTypeDropdown setVenuetypedetails={setVenuetypedetails} />
            </div>


            <div className="pure-controls">
              <button className="pure-button pure-button-primary" onClick={createVenue}>
                Add New Venue
              </button>
            </div>
          </div>

          <div className="pure-u-1-3"></div>

          <div>{message}</div>
        </div>
      </div>
    );
  } else {
    return redirectHome();
  }
}
