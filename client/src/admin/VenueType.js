import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";


export default function VenueTypeDropdown(props) {
  const [venueType, setVenueType] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/admin/venue/create').then(function (res) {
      console.log(res);
      if (!props.selectedVenueType) {
        props.setVenuetypedetails(res.data[0].venue_type);
      }
      setVenueType(res.data);
    });
  }, []);

  return (
    <select id="aligned-status"
      onChange={(e) => {
        props.setVenuetypedetails(e.target.value);
      }}>
      {venueType.map((res) => {
        if (props.selectedVenueType) {
          if (props.selectedVenueType === res.venue_type) {
            return <option key={res.venue_type} value={res.venue_type} selected>{res.venue_type}</option>
          } else {
            return <option key={res.venue_type} value={res.venue_type}>{res.venue_type}</option>
          }
        } else {
          return <option key={res.venue_type} value={res.venue_type}>{res.venue_type}</option>
        }
      }

      )}
    </select>
  )
}



