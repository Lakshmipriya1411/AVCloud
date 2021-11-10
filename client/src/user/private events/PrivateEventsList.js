import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import dateToString from "../../common/dateConverter";

export default function PrivateEventsList(props) {
  axios.defaults.withCredentials = true;
  //const [data, setData] = useState([]);
  const [exception, setException] = useState(false);
  const [eventName, setEventName] = useState("");
  const [attendees, setAttendees] = useState(0);
  const [bookingMode, setBookingMode] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [bookingSuccess, SetBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [endDate, setEndDate]= useState(props.date);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reload, setReload] = useState(false);
  const columns = [
    { field: "venue_id", headerName: "Venue Number", width: 200 },
    { field: "venue_name", headerName: "Venue Name", width: 200 },
    // { field: "capacity", headerName: "Venue Capacity", width: 200 },
  ];
  const [rowData, setRowData] = useState({});
  const updateEndDate = (days) => {
    if(days !== 1){
      let end = new Date(props.date)
      end.setDate( end.getDate() + days-1);
      setEndDate(dateToString(end))
    }else{
      setEndDate(props.date);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleBooking = () => {
    if (eventName === "" || attendees > 100) {
      setInvalid(true);
      return;
    } else {
      axios
        .post("http://localhost:3001/user/partyInsert", {
          venue_id: rowData.data.venue_id,
          event_name: eventName,
          start_date: props.date,
          end_date: endDate,
          no_of_attendees: attendees,
        })
        .then((result) => {
          SetBookingSuccess(true);
        })
        .catch((err) => {
          setMessage(err.response.data.err)
          setOpen(true);
        });
    }
  };
  useEffect(() => {
    setRowData({});
    setEndDate(props.date);
    setLoading(true);
    setReload(false);
    axios
      .get("http://localhost:3001/user/partyGetVenues", {
        params: { date: props.date },
      })
      .then((response) => {
        //setData(response.data);
        setRows(response.data);
        setBookingMode(false);
        SetBookingSuccess(false);
        setEventName("");
        setLoading(false);
      })
      .catch((err) => {
        if(err.message){
          setMessage(err.message)
        }else{
          setMessage(err.response.data.err)
        }
        setException(true);
        setLoading(false);
      });
  }, [props.date,reload]);

  if (bookingSuccess) {
    return (
      <div style={{display:"flex"}}>
        {/* <FormGroup> */}
          <FormControl>
            <Alert severity="info">Booking successfull</Alert>
          </FormControl>
          <FormControl style={{margin:"auto 8px"}}>
            <Link
              
              to="/user/myBookings"
              onClick={() => {
                setBookingMode(false);
                SetBookingSuccess(false);
              }}
            >
              Go to My bookings
            </Link>
          </FormControl>
          <FormControl style={{margin:"auto 8px"}}>
          <Button
            variant="contained"
            onClick={() => {
              setBookingMode(false);
              SetBookingSuccess(false);
              setReload(true);
            }}
          >
            Go back
          </Button>
        </FormControl>
        {/* </FormGroup> */}
      </div>
    );
  }
  if (bookingMode) {
    return (
      <div>
        <FormControl style={{margin:"auto 8px"}}>
          <TextField
            id="private-event-name"
            label="Event Name"
            value={eventName}
            error={invalid}
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
        </FormControl>
        {<FormControl style={{margin:"auto 8px"}}>
          <InputLabel htmlFor="private-event-days">No of Days</InputLabel>
          <Select
            labelId="private-event-days-label"
            id="private-event-days"
            defaultValue={1}
            onChange = {(e)=>{updateEndDate(e.target.value)}}
          >
            <MenuItem value={1}>One Day</MenuItem>
            <MenuItem value={2}>Two Days</MenuItem>
          </Select>
        </FormControl>}
        <FormControl style={{margin:"auto 8px"}}>
          <TextField
            error={invalid}
            helperText={"Max: 100"}
            id="private-event-capacity"
            label="No of Attendees"
            type="number"
            onChange={(e) => setAttendees(e.target.value)}
          />
        </FormControl>
        <FormControl style={{margin:"auto 8px"}}>
          <Button
            variant="contained"
            onClick={() => {
              setBookingMode(false);
            }}
          >
            Go back
          </Button>
        </FormControl>
        <FormControl style={{margin:"auto 8px"}}>
          <Button variant="contained" color="primary" onClick={handleBooking}>
            Book
          </Button>
        </FormControl>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
      </div>
    );
  }
  if (exception) {
    return <Alert severity="error">{message}</Alert>;
  }
  // if (data.length === 0) {
  //   return <Alert severity="info">No slots available to book today</Alert>;
  // }
  return (
    <div className="width100">
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          loading={loading}
          getRowId={(row) => row.venue_id}
          onRowSelected={(rowData) => {
            setRowData(rowData);
          }}
          autoHeight = "true"
        />
        <Button style= {{margin:"8px",display:"block",marginLeft:"auto"}}
          variant="contained"
          color="primary"
          disabled={!(rowData && rowData.isSelected)}
          onClick = {()=>{
            setBookingMode(true);
          }}
        >
          Proceed to Book
        </Button>
      </div>
    </div>
  );
}
