import { Button, Snackbar } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import dateToString from "../../common/dateConverter";

export default function PrivateEventBookings() {
  axios.defaults.withCredentials = true;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState({});
  const [upcoming, setUpcoming] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const columns = [
    { field: "p_name", headerName: "Event Name", width: 200 },
    { field: "party_id", headerName: "ID", width: 200 },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 200,
      valueFormatter: (params) => {
        return dateToString(params.value);
      },
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 200,
      valueFormatter: (params) => {
        return dateToString(params.value);
      },
    },

    { field: "hosted_at", headerName: "Venue ID", width: 200 },
    { field: "no_of_attendees", headerName: "No of Attendees", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
  ];
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/user/partyGetBookings")
      .then((response) => {
        setRows(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if(err.message){
          setMessage(err.message);
        }else{
          setMessage(err.response.data.err);
        }
        setOpen(true);
        setLoading(false);
      });
  }, []);
  const cancelBooking = () => {
    axios
      .post("http://localhost:3001/user/cancelParty", {
        party_id: rowData.data.party_id,
      })
      .then((result) => {
        setLoading(true);
        axios
          .get("http://localhost:3001/user/partyGetBookings")
          .then((response) => {
            setRows(response.data);
            setLoading(false);
            setUpcoming(false);
          })
          .catch((err) => {
            if(err.message){
              setMessage(err.message);
            }else{
              setMessage(err.response.data.err);
            }
            
            setOpen(true);
            setLoading(false);
          });
      })
      .catch((err) => {});
  };

  if (rows.length === 0) {
    return <div>No recent booking history</div>;
  }
  return (
    <div className="width100">
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={loading}
          getRowId={(row) => row.party_id}
          autoHeight="true"
          onRowSelected={(rowData) => {
            setRowData(rowData);
            if (
              new Date(rowData.data.start_date) > new Date() &&
              rowData.data.status === "Confirmed"
            ) {
              setUpcoming(true);
            } else {
              setUpcoming(false);
            }
          }}
        />
      </div>
      <Button
        style={{ margin: "8px", display: "block", marginLeft: "auto" }}
        variant="contained"
        color="primary"
        disabled={!upcoming}
        onClick={cancelBooking}
      >
        Cancel
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
