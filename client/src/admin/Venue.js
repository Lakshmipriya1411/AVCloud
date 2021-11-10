import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

export default function VenueDropdown(props) {
  const [venueList, setVenueList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/admin/events/create').then(function (res) {
      console.log(res);
      if (!props.selectedVenue) {
        props.setEventDeatilsVenue(res.data[0].venue_id);
      }
      setVenueList(res.data);
    });
  }, []);

  return (
    <select id="aligned-status"
      onChange={(e) => {
        props.setEventDeatilsVenue(e.target.value);
      }}>
      {venueList.map((res) => {
        if (props.selectedVenue) {
          if (props.selectedVenue === res.venue_id) {
            return <option key={res.venue_id} value={res.venue_id} selected>{res.venue_name}</option>
          } else {
            return <option key={res.venue_id} value={res.venue_id}>{res.venue_name}</option>
          }
        } else {
          return <option key={res.venue_id} value={res.venue_id}>{res.venue_name}</option>
        }
      }

      )}
    </select>
  )
}

