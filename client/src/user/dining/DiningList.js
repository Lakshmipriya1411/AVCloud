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

export default function DiningList(props) {
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
  const [endDate, setEndDate] = useState(props.date);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const columns = [
    { field: "dining_id", headerName: "dining_id", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "venue_name", headerName: "Venue Name", width: 200 },
    { field: "capacity", headerName: "Dining Capacity", width: 200 },
    { field: "start_time", headerName: "Start Time", width: 200 },
    { field: "end_time", headerName: "End Time", width: 200 },
  ];
  const [rowData, setRowData] = useState({});
  const updateEndDate = (days) => {
    if (days !== 1) {
      let end = new Date(props.date);
      end.setDate(end.getDate() + days - 1);
      setEndDate(dateToString(end));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleBooking = () => {
    axios
      .put("http://localhost:3001/user/createdining", {
        date: props.date,
        id: rowData.data.dining_id,
      })
      .then((result) => {
        console.log(rowData.data.capacity - result.data[0].available);

        if (attendees > rowData.data.capacity - result.data[0].available) {
          window.alert(
            "Available Capacity is - " +
              String(rowData.data.capacity - result.data[0].available)
          );
          setInvalid(true);
          return;
        } else {
          axios
            .post("http://localhost:3001/user/createdining", {
              reservation_date: props.date,
              status: "Approved",
              no_of_ppl: attendees,
              dining_id: rowData.data.dining_id,
            })
            .then((result) => {
              SetBookingSuccess(true);
            })
            .catch((err) => {
              setMessage(err.response.data.err);
              setOpen(true);
            });
        }
      })
      .catch((err) => {
        setMessage(err.response.data.err);
        setOpen(true);
      });
  };

  useEffect(() => {
    setEndDate(props.date);
    setLoading(true);
    axios
      .get("http://localhost:3001/user/createdining", {
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
        if (err.message) {
          setMessage(err.message);
        } else {
          setMessage(err.response.data.err);
        }
        setException(true);
        setLoading(false);
      });
  }, [props.date]);

  if (bookingSuccess) {
    return (
      <div>
        <FormGroup>
          <FormControl>
            <Alert severity="info">Booking successfull</Alert>
          </FormControl>
          <FormControl>
            <Link
              className="margin8"
              to="/user/myBookings"
              onClick={() => {
                setBookingMode(false);
                SetBookingSuccess(false);
              }}
            >
              Go to My bookings
            </Link>
          </FormControl>
        </FormGroup>
      </div>
    );
  }
  if (bookingMode) {
    return (
      <div>
        <FormControl>
          <TextField
            error={invalid}
            helperText={"Max: " + rowData.data.capacity}
            id="private-event-capacity"
            label="No of People"
            type="number"
            onChange={(e) => setAttendees(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            style={{ marginLeft: "20px" }}
            onClick={() => {
              setBookingMode(false);
            }}
          >
            Go back
          </Button>
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={handleBooking}
          >
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          loading={loading}
          getRowId={(row) => row.dining_id}
          onRowSelected={(rowData) => {
            setRowData(rowData);
          }}
          autoHeight="true"
        />
        <Button
          style={{ margin: "8px", display: "block", marginLeft: "auto" }}
          variant="contained"
          color="primary"
          disabled={!(rowData && rowData.isSelected)}
          onClick={() => {
            setBookingMode(true);
          }}
        >
          Proceed to Book
        </Button>
      </div>
    </div>
  );
}
