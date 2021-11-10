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


export default function SportsHistory() {
      axios.defaults.withCredentials = true;
      const [rows, setRows] = useState([]);
      const [loading, setLoading] = useState(false);
      const [bookingMode, setBookingMode] = useState(false);
      const [bookingSuccess, SetBookingSuccess] = useState(false);
      const [rowData, setRowData] = useState([]);
      const [exception, setException] = useState(false);


      const columns = [
      { field: "booking_id", headerName: "Booking ID" , width:200},
      { field: "s_name", headerName: "Sports Name",width:200 },
      { field: "booking_date", headerName: "Sport's Day" ,width:200},
      { field: "start_time", headerName: "Start Time" ,width:200},
      { field: "end_time", headerName: "End Time" ,width:200},
      { field: "status", headerName: "Booking Status" ,width:200},
      ];


      const handleBooking = () => {
        axios
          .post("http://localhost:3001/user/cancelSportsBooking",{
            booking_id: rowData.data.booking_id,
            s_name: rowData.data.s_name,
          })
          .then((result) => {
            setBookingMode(false);
            SetBookingSuccess(true);
          })
          .catch((err) => {setException(true);
          });
  };

      useEffect(() => {
        axios
          .get("http://localhost:3001/user/getSportsHistory")
          .then((response) => {
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
                }}
                disabled={!(rowData && rowData.isSelected && rowData.data.status === "Booked")}
                >
                Cancel Booking
            </Button>
        </div>
      );
      
}