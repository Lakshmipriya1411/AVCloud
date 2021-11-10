import React, { useState } from "react";
import Navi from "../common/Navi";
import { useLoginValidate } from "../common/Validate";
import Loading from "../common/Loading";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import PrivateEventsList from "../user/private events/PrivateEventsList";
import SportsList from "../user/sports/SportsList";
import dateToString from "../common/dateConverter";
import EventsList from "../user/events/EventsList";
import DiningList from "../user/dining/DiningList";

export default function Main() {
  const { loading, userData } = useLoginValidate();
  const [startDate, setStartDate] = useState(new Date());
  const addDays = (date, count) => {
    date.setDate(date.getDate() + count);
    return date;
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Navi></Navi>
      <DatePicker
        id = "mainDate"
        className="margin8"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        maxDate={addDays(new Date(), 30)}
      />
      <Accordion
        disabled={
          userData.membership_type === 2 || userData.auth_id === 1
            ? false
            : true
        }
        defaultExpanded={
          userData.membership_type === 2 || userData.auth_id === 1
            ? true
            : false
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          style={{ background: "lightcyan" }}
        >
          <Typography>
            Private Event Slots{" "}
            {userData.membership_type === 2 || userData.auth_id === 1
              ? ""
              : " (!Only Platinum users have access to this)"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {(userData.membership_type === 2 || userData.auth_id === 1) && (
            <PrivateEventsList
              date={dateToString(startDate)}
            ></PrivateEventsList>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          style={{ background: "lightcyan" }}
        >
          <Typography>Sports</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SportsList date={dateToString(startDate)}></SportsList>
        </AccordionDetails>
      </Accordion>
      <Accordion
        disabled={userData.user_id ? false : true}
        defaultExpanded={userData.user_id ? true : false}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          style={{ background: "lightcyan" }}
        >
          <Typography>
            Dining {userData.user_id ? "" : " (!Login to access this content)"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DiningList date={dateToString(startDate)}></DiningList>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ background: "lightcyan" }}
        >
          <Typography>Events</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EventsList></EventsList>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
