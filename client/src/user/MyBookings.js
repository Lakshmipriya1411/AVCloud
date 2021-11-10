import React from "react";
import Navi from "../common/Navi";
import { useLoginValidate } from "../common/Validate";
import Loading from "../common/Loading";
import { Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PrivateEventBookings from "./private events/PrivateEventBookings";
import SportsHistory from "./sports/SportsHistory";
import { Link } from "react-router-dom";
import DiningHistory from "./dining/DiningHistory";
import EventsHistory from "./events/EventsHistory";
export default function MyBookings() {
  const { loading, userData } = useLoginValidate();
  if (loading) {
    return <Loading></Loading>;
  } else if (userData.user_id) {
    return (
      <Box>
        <Navi></Navi>
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
              Private Events{" "}
              {userData.membership_type === 2 || userData.auth_id === 1
                ? ""
                : " (!Only Platinum users have access to this)"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {(userData.membership_type === 2 || userData.auth_id === 1) && (
              <PrivateEventBookings></PrivateEventBookings>
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
            <SportsHistory></SportsHistory>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            style={{ background: "lightcyan" }}
          >
            <Typography>Dining</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DiningHistory></DiningHistory>
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
		   <EventsHistory></EventsHistory>
		  </AccordionDetails>
        </Accordion>
      </Box>
    );
  } else {
    return <Link to="/login"> Go to Login Page</Link>;
  }
}
