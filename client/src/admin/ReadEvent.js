import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { useParams, useHistory } from 'react-router-dom';
import VenueDropdown from "./Venue";

let details = {};


const ReadDetails = (props) => {
  Axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const history = useHistory();

  const deleteEventDetails = () => {
    Axios.post("http://localhost:3001/admin/events/delete",
      { event_id: details.event_id }
    )
      .then((response) => {
        history.push("/admin");
      })
      .catch((error) => {
      });

  }

  useEffect(() => {
    Axios.get('http://localhost:3001/admin/events/details/' + id).then(function (res) {
      console.log(res);
      details = res.data;
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }


  return (
    <fieldset>
      <div className="pure-u-1-3"></div>

      <div className="pure-u-1-3">
        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Name: </label>
          <label id="aligned-name">{details.event_name}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Description: </label>
          <label id="aligned-name">{details.e_description}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Start Date: </label>
          <label id="aligned-name">{details.start_date}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">End Date: </label>
          <label id="aligned-name">{details.end_date}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Status: </label>
          <label id="aligned-name">{details.status}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Venue: </label>
          <label id="aligned-name">{details.venue_name}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Capacity: </label>
          <label id="aligned-name">{details.capacity}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Organiser: </label>
          <label id="aligned-name">{details.organized_by}</label>
        </div>

        <br />
        <br />
        <div className="pure-control-group">
          <div className="pure-u-1-6">
          </div>
          <div className="pure-u-1-6">
            <button className="pure-button pure-button-primary"
              onClick={() =>
                props.updateEvent(details)}>
              Update Event
            </button>
          </div>
          <div className="pure-u-1-6">
          </div>
          <div className="pure-u-1-6">
            <button className="pure-button pure-button-error"
              onClick={deleteEventDetails}>
              Delete Event
            </button>
          </div>
        </div>

      </div>

      <div className="pure-u-1-3"></div>

    </fieldset>
  );

}

const UpdateDetails = (props) => {

  const history = useHistory();
  const setEventDeatilsVenue = (venueId) => {
    props.setDetails({ ...props.details, venue_id: venueId });
  }

  const updateEvent = () => {
    Axios.post("http://localhost:3001/admin/events/update",
      props.details,
    )
      .then((response) => {
        history.push("/admin");
      })
      .catch((error) => {
      });

  };

  return (
    <fieldset>

      <div className="pure-u-1-3"></div>

      <div className="pure-u-1-3">
        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Name</label>
          <input
            type="text"
            id="aligned-name" placeholder="Event Name"
            value={props.details.event_name}
            onChange={(e) => {
              props.setDetails({ ...props.details, event_name: e.target.value });
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-description">Event Description</label>
          <input
            type="text"
            id="aligned-description" placeholder="Event Description"
            value={props.details.e_description}
            onChange={(e) => {
              props.setDetails({ ...props.details, e_description: e.target.value });
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-start-date">Event Start Date</label>
          <input
            type="date"
            id="aligned-start-date"
            value={props.details.start_date}
            onChange={(e) => {
              props.setDetails({ ...props.details, start_date: e.target.value });
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-end-date">Event End Date</label>
          <input
            type="date"
            id="aligned-end-date"
            value={props.details.end_date}
            onChange={(e) => {
              props.setDetails({ ...props.details, end_date: e.target.value });
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-status">Event Status</label>
          <select id="aligned-status"
            onChange={(e) => {
              props.setDetails({ ...props.details, status: e.target.value });
            }}>
            <option value="Please select">Please Select</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>


        <div className="pure-control-group">
          <label htmlFor="aligned-venue">Venue</label>
          <VenueDropdown setEventDeatilsVenue={setEventDeatilsVenue} selectedVenue={props.details.venue_id} />
        </div>


        <div className="pure-control-group">
          <label htmlFor="aligned-capacity">Capacity</label>
          <input
            type="text"
            id="aligned-capacity" placeholder="Capacity"
            value={props.details.capacity}
            onChange={(e) => {
              props.setDetails({ ...props.details, capacity: e.target.value });
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-organiser">Organiser</label>
          <label id="aligned-name">{props.details.organized_by}</label>
        </div>

        <div className="pure-controls">
          <button className="pure-button pure-button-primary" onClick={updateEvent}>
            Update Event
            </button>
        </div>
      </div>

      <div className="pure-u-1-3"></div>

    </fieldset>
  )

}



const Details = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [userDetails, setDetails] = useState({});
  const updateEvent = (details) => {
    setDetails(details);
    setShowDetails(false);
  }

  if (showDetails) {
    return (
      <ReadDetails updateEvent={updateEvent} />
    )
  } else {
    return (
      <UpdateDetails details={userDetails} setDetails={setDetails} />
    )
  }

}

export default function ReadEvent() {
  Axios.defaults.withCredentials = true;
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
        <form className="pure-form pure-form-aligned">
          <h1 style={{ textAlign: "center" }}>Event Details</h1>
          <Details />
        </form>
      </div>
    );
  } else {
    return redirectHome();
  }
}



