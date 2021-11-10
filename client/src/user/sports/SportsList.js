import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  FormControl,
  FormGroup,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { useLoginValidate } from "../../common/Validate";
import { useHistory } from "react-router-dom";


export default function SportsList(props) {
    const { loading, userData } = useLoginValidate();
    const [exception, setException] = useState(false);
    const [rows, setRows] = useState([]);
    const [allSportsRows, setAllSportsRows] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [slotData, setSlotData] = useState([]);
    const [bookingMode, setBookingMode] = useState(false);
    const [bookingSuccess, SetBookingSuccess] =useState(false);
    const history = useHistory();
    const [allSports, setAllSport] = useState(true);

    const columns = [
      {field : "sport_id", headerName: "Sport ID", width:200},
        { field: "s_name", headerName: "Sport Name" , width:200},
        {field : "start_time", headerName: "Start Time", width:200},
        {field : "end_time", headerName: "End Time", width:200},
        {field : "venue_name", headerName: "Venue", width:200},
        
    ];
      
           
    const handleBooking = () => {
          axios
            .post("http://localhost:3001/user/sportsBookingInsert",{
              status: 'Booked',
              booking_date: props.date,
              sport_id: slotData.data.sport_id,
              user_id: userData.user_id,
              ts_id: slotData.data.ts_id,
            })
            .then((result) => {
              setBookingMode(false);
              SetBookingSuccess(true);
            })
            .catch((err) => {setException(true);
            });
    };

    useEffect(() => {
      getAllSports();
    },[props.date]);

    const getAllSports = () => {
        axios
        .get("http://localhost:3001/user/getAllSports", {
          params: { date: props.date },
        })
        .then((response) => {
          setAllSportsRows(response.data);
          setAllSport(false);
          setBookingMode(false);
          SetBookingSuccess(false);
          
    })
       .catch((err) => {
          setException(true);
        });
    };
      
    const gettingSlots = () => {
        console.log("Running gettingSlots function.")
        axios
          .get("http://localhost:3001/user/getBookingSlot",{
            params:{ sport_id: rowData.data.sport_id, date: props.date},
          })
          .then((result) => {
            // var slots=response.data;
            setRows(result.data);
            setBookingMode(true);
            SetBookingSuccess(false);
        })
          .catch((err) => {
            setException(true);
          });
    };


    if (bookingSuccess) {
        return (
          <div>
            <FormGroup>
              <FormControl>
                <Alert severity="info">Booking successful</Alert>
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


    if(userData.user_id) {
          if(bookingMode)
          {  
           return (
            <div className="width100">  
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            autoHeight = "true"
            getRowId={(row)=>row.ts_id}
            onRowSelected = {(slotData)=> {
            setSlotData(slotData);
            }}
            />
              <Button style= {{margin:"8px",display:"block",marginLeft:"auto"}}
              variant="contained"
              color="primary"
              disabled={!(slotData && slotData.isSelected)}
              onClick = {()=>handleBooking()}>
              Book Slot
              </Button>
              <Button
              variant="contained"
              onClick={() =>{  
                getAllSports();
                }
                }>
              Go back
              </Button>
              </div>
            );
          }
          else{
               return (               
                  <div className="width100">  
                      <DataGrid
                      rows={allSportsRows}
                      columns={columns}
                      pageSize={3}
                      autoHeight = "true"
                      getRowId={(row) => row.sport_id}
                      onRowSelected = {(rowData)=> {
                      setRowData(rowData);
                      }}
                      />
                      <Button style= {{margin:"8px",display:"block",marginLeft:"auto"}}
                      variant="contained"
                      color="primary"
                      disabled={!(rowData && rowData.isSelected)}
                      onClick = {()=>gettingSlots()}>
                      View Available Slot
                      </Button>
                    </div>
              );
           }
       }
      else {
          return (               
              <div className="width100">  
                  <DataGrid
                  rows={allSportsRows}
                  columns={columns}
                  pageSize={3}
                  autoHeight = "true"
                  getRowId={(row) => row.sport_id}
                  onRowSelected = {(rowData)=> {
                  }}
              />
              </div>
              );
      }   
}