const db = require("../database/dbConnector");
const sendEmail = require("../database/emailConnector");
const SQL_USER_EVENTS = require("../database/SQL/User/userEventsSql");
const logger = require('../modules/logger');
const SQL_EVENTS = require("../database/SQL/Admin/eventSql");

const getuserEvents = (req, res) => {
    logger.request.info("get user events list");
    db.query(SQL_USER_EVENTS.GET_EVENTS_LIST, (error, results, fields) => {
        if (error) {
            logger.request.info("get user events list error " + error.message);
            return console.error(error.message);
        }
        logger.response.info("user events list : " + results != null ? JSON.stringify(results) : "No data found");
        res.send(results);
    });
}
const updateUserEvents = (req, res) => {
    logger.request.info("update user events");
    const {
        no_of_participants,
        event_id,
        user_id
    } = req.body;
    db.query(SQL_USER_EVENTS.UPDATE_USER_EVENTS, [
        no_of_participants,
        event_id,
        user_id
    ], (error, results, fields) => {
        if (error) {
            logger.request.info("update user events error " + error.message);
            console.log(error);
            res.status(404).send({
                err: error.errno === 1062 ? "Error updating event" : error.code
            });
        } else {
            logger.request.info("update user events successful " + results != null ? JSON.stringify(results) : "No data found");
            res.send(results);
        }
    });
}
const cancelEventsBooking = (req, res) => {
    logger.request.info(" Cancellation of booking");
    console.log(req.session.user.user_id);
    const {
        no_of_participants,
        booking_id,
        user_id,
        event_id,
    } = req.body;
    if (!req.session.user) {
        logger.response.error("Invalid user session " + error.message);
        res.status(404).send({ err: "Invalid user session" });
        return;
    }
    db.query(
        SQL_USER_EVENTS.CANCEL_EVENTS_BOOKING, [booking_id, req.session.user.user_id, event_id],
        (error, result) => {
            if (error) {
                logger.response.error(
                    "Error in cancelling the booking " + error.message
                );
                res.status(404).send({ err: error.code });
                return;
            } else if (result.length == 0) {
                logger.response.info("No rows to cancel ");
                res.send([]);
            } else {
                logger.response.info("Cancellation request for booking details : " + JSON.stringify(result));
                res.send(result);
            }
        }
    );
};

const getEventsHistory = (req, res) => {
    console.log("eventhistory")
    logger.request.info("Getting events booking history");
    if (!req.session.user) {
        logger.response.error("Invalid user session");
        res.status(404).send({ err: "Invalid user session" });
        return;
    }
    db.query(SQL_USER_EVENTS.GET_EVENTS_HISTORY, [req.session.user.user_id], (error, result) => {
        if (error) {
            logger.response.error(
                "Error in fetching booking history " + error.message
            );
            res.status(404).send({ err: error.code });
        } else if (result.length == 0) {
            logger.response.info("No booking history to show");
            res.send([]);
        } else {
            logger.response.info("Booking history : " + JSON.stringify(result));
            res.send(result);
        }
    });
};



module.exports = {
    getuserEvents,
    updateUserEvents,
    cancelEventsBooking,
    getEventsHistory
};