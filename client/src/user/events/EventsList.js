import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { DataGrid } from "@material-ui/data-grid";
import { useLoginValidate } from "../../common/Validate";
import { Link } from "react-router-dom";
import $ from "jquery";
import 'jquery-confirm';
import "../../jquery-confirm.min.css";

import {
  Button,
  FormControl,
  FormGroup,
  TextField,
} from "@material-ui/core";
let data={};
let bookingstatus=false;
export default function EventList(props) {

  axios.defaults.withCredentials = true;
  const [rowData, setRowData] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState("");
  const [attendees, setAttendees] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const [updateResult, setResult] = useState("");
  const [bookingSuccess, SetBookingSuccess] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {      
      getEvents();
      if (response.data.loggedIn === true) {
        setUserData(response.data.user);
        console.log(response.data.user);
      } else {
        setUserData({});
      }
      setLoading(false);
      data = response.data;

    });
  }, []);
   const handleBooking = () => {	  
    if (rowData.data.event_name === "" || attendees > rowData.data.capacity || attendees <=0) {
      setInvalid(true);
      return;
    } else {
		setInvalid(false);
      axios
        .post("http://localhost:3001/user/updateEvents", {
          no_of_participants: attendees,
          event_id: rowData.data.event_id,
          user_id: data.user.user_id
        })
        .then((result) => {	
			
			if(result!=null && result.data!=null && result.data[1]!=null && result.data[1][0]!=null)
			{					
			const resultObject = Object.values(result.data[1][0])[0];		
			
			if(result.statusText.toLowerCase() =="OK".toLowerCase() && resultObject ==1)
			{
			SetBookingSuccess(true);
			bookingstatus = true;

			$.alert({
				width: 'auto',
				title: 'Message!',
				content: 'Booking Successful!. Go to <a href="user/myBookings" /> My Bookings',
				useBootstrap: false, // Key line
				boxWidth: '30%'
			});

			}
			}
        })
        .catch((err) => {
			$.alert({
            width: 'auto',
            title: 'Message!',
            content: 'Booking Failed!',
            useBootstrap: false, // Key line
            boxWidth: '20%'
          });
		});
    }
	
  };
 
    const [exception, setException] = useState(false);
    const [rows, setRows] = useState([]);
    const [bookingMode, setBookingMode] = useState(false);  
    const columns = [
        { field: "event_name", headerName: "Events Name" , width:200},
        {field : "start_date", headerName: "Start Date", width:200,  type: "date"},
        {field : "end_date", headerName: "End Date", width:200},
        {field : "venue_name", headerName: "Venue", width:200},
        {field : "capacity", headerName: "Avaialble Slots", width:200},
		{field : "status", headerName: "Status", width:200}
      ];
   const getEvents=   () => {
        setLoading(true);
        axios
          .get("http://localhost:3001/user/getEvents")
          .then((response) => {	   
            setRows(response.data);
            setLoading(false);	
          })
          .catch((err) => {
            setException(true);
            setLoading(false);
          });
      };
    
  if (bookingMode) {	 
    return (
      <div>
        <FormControl>
          <TextField
            id="event-name"
            label="Event Name"
            value={rowData.data.event_name}
            error={invalid}
            onChange={(e) => {
			  console.log(e.target.value);
              setEventName(e.target.value);
            }}
          />
        </FormControl>        
        <FormControl>
          <TextField
            error={invalid}
            helperText={"Max: " + rowData.data.capacity}
            id="event-capacity"
            label="No of Attendees"
            type="number"
            onChange={(e) => setAttendees(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            onClick={() => {
              setBookingMode(false);
              getEvents();
            }}
          >
            Go back
          </Button>
        </FormControl>
        <FormControl>
          <Button variant="contained" color="primary" onClick={handleBooking}>
            Book
          </Button>
        </FormControl>
      </div>
    );
  }
    if (exception) {
    return <Alert severity="error">Invalid request : server side error</Alert>;
  }
 
     if(data.user && data.loggedIn && data.user.auth_id==0) {
          return (               
                    <div className="width100">  
                        <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={3}
                        autoHeight = "true"
                        getRowId={(row) => row.event_id}
						
                        onRowSelected={(rowData) => {
							setRowData(rowData);
						}}
                        />
                        <Button style= {{margin:"8px",display:"block",marginLeft:"auto"}}
                        variant="contained"
						disabled={!(rowData && rowData.isSelected &&rowData.data.status.toLowerCase()=="Confirmed".toLowerCase())}
                        color="primary"
                        onClick = {()=>{
                            setBookingMode(true);
                        }}
                        >
                        Proceed to Booking
                        </Button>
                         </div>
            );
        }else {
            return (               
                <div className="width100">  
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={3}
                    autoHeight = "true"
                    getRowId={(row) => row.event_id}
                    onRowSelected = {(rowData)=> {
                    console.log(rowData);
                    }}
                />
                </div>
                );
        }
}