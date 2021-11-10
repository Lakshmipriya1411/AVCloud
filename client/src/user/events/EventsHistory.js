import {} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import {
  Button,
  FormControl,
  FormGroup,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import { Link } from "react-router-dom";


export default function EventsHistory() {
      axios.defaults.withCredentials = true;
      const [rows, setRows] = useState([]);
      const [loading, setLoading] = useState(false);
      const [bookingMode, setBookingMode] = useState(false);
      const [bookingSuccess, SetBookingSuccess] = useState(false);
      const [rowData, setRowData] = useState([]);
      const [exception, setException] = useState(false);


      const columns = [
      { field: "booking_id", headerName: "Booking ID" , width:100},
	  { field: "event_id", headerName: "Event ID" ,width:100},
      { field: "event_name", headerName: "Events Name",width:200 },
      { field: "booking_date", headerName: "Events's Day" ,width:200},
      { field: "start_date", headerName: "Start Date" ,width:200},
      { field: "end_date", headerName: "End Date" ,width:200},
      { field: "status", headerName: "Booking Status" ,width:200},
	  { field: "no_of_participants", headerName: "Participants" ,width:200},	 
      ];


      const handleBooking = () => {
		  console.log( rowData.data.booking_id);
			console.log( rowData.data.event_name);
			console.log( rowData.data.event_id);			
        axios
          .post("http://localhost:3001/user/cancelEventsBooking",{			
            booking_id: rowData.data.booking_id,           
			user_id:null,
			event_id:rowData.data.event_id,
			
			
          })
          .then((result) => {
			  console.log(result);
            setBookingMode(false);
            SetBookingSuccess(true);
          })
          .catch((err) => {setException(true);
          });
  };

      useEffect(() => {
        axios
          .get("http://localhost:3001/user/getEventsHistory")
          .then((response) => {
			  console.log(response);
            setRows(response.data);
            setLoading(false);
          })
          .catch((err) => {});
      }, []);
    

      if (bookingSuccess) {
        return (
          <div>
            <FormGroup>
              <FormControl>
                <Alert severity="info">Booking Cancelled</Alert>
              </FormControl>
              <FormControl>       
				 <Link
                  className="margin8"
                  to="/user/myBookings"
                  onClick={() => {
                    setBookingMode(false);
                    SetBookingSuccess(false);
                    window.location.reload();
                  }}
                >
                  Go to My bookings
                </Link>
              </FormControl>
            </FormGroup>
          </div>
        );
    }


    if(bookingMode){
              return (
              <div>
        <FormGroup>
          <FormControl>
            <Alert severity="info">
              <p>Do you really want to cancel this booking?</p>
                <button onClick={() => {
                  setBookingMode(false);
                }}>No</button>
                <button
                  onClick={() => {
                    handleBooking();
                  }}
                >
                  Yes, Cancel it!
                </button>
              </Alert>
          </FormControl>
          </FormGroup>
          </div>
            );      
      }
       

      if (rows.length === 0) {
        return <div>No recent booking history</div>;
      }
      return (
        <div className="width100">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid 
              rows={rows}
              columns={columns}
              pageSize={5}
              loading = {loading}
              getRowId={(row) => row.booking_id}
              onRowSelected = {(rowData)=> {
                setRowData(rowData);
              }}
            />
            </div>
            <Button style= {{margin:"7px",display:"block",marginLeft:"auto"}}
                variant="contained"
                color="primary"
                onClick = {()=>{
                setBookingMode(true);
				console.log(rowData);
                }}
                disabled={!(rowData && rowData.isSelected && rowData.data.status.toLowerCase() === "confirm".toLowerCase())}
                >
                Cancel Booking
            </Button>
        </div>
      );
      
}