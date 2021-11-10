const db = require("../database/dbConnector");
const logger = require("../modules/logger");

const {
  GET_ALL_SPORTS,
  GET_SPORT_BOOKING_SLOT,
  SPORTS_BOOKING_INSERT,
  CANCEL_SPORTS_BOOKING,
  GET_SPORTS_HISTORY,
} = require("../database/SQL/Sports/sportsSQL");
const { v4: uuidv4 } = require("uuid");

const getAllSports = (req, res) => {
  logger.request.info("Getting list of all sports of CountryClub.");
  db.query(GET_ALL_SPORTS, (error, result) => {
    if (error) {
      logger.response.error("Error in fetching sports list " + error.message);
      res.status(404).send({ err: error.code });
      return;
    } else if (result.length == 0) {
      logger.response.info("No rows to return in the sports list ");
      res.send([]);
    } else {
      logger.response.info("Sports list : " +  JSON.stringify(result));
      res.send(result);
    }
  });
};

const getBookingSlot = (req, res) => {
  logger.request.info(
    "Getting list of all available slots of a particular sport."
  );
  db.query(
    GET_SPORT_BOOKING_SLOT,
    [req.query.sport_id, req.query.sport_id, req.query.date],
    (error, result) => {
      if (error) {
        logger.response.error("Error in fetching slots " + error.message);
        res.status(404).send({ err: error.code });
        return;
      } else if (result.length == 0) {
        logger.response.info("No rows to return in slots list");
        res.send([]);
      } else {
        logger.response.info("Available Booking Slots list : " +  JSON.stringify(result));
        res.send(result);
      }
    }
  );
};

const sportsBookingInsert = (req, res) => {
  logger.request.info("Insertion of booking details");
  if (!req.session.user) {
    logger.response.error("Invalid user session " + error.message);
    res.status(404).send({ err: "Invalid user session" });
    return;
  }
  db.query(
    SPORTS_BOOKING_INSERT,
    [
      req.body.status,
      req.body.booking_date,
      req.body.sport_id,
      req.session.user.user_id,
      req.body.ts_id,
    ],
    (error, result) => {
      if (error) {
        logger.response.error(
          "Error in inserting booking details " + error.message
        );
        res.status(404).send({ err: error.code });
        return;
      } else if (result.length == 0) {
        logger.response.info("No rows to insert in Booking table");
        res.send([]);
      } else {
        logger.response.info("Booking details of the user : " +  JSON.stringify(result));
        res.send(result);
      }
    }
  );
};

const cancelSportsBooking = (req, res) => {
  logger.request.info(" Cancellation of booking");
  if (!req.session.user) {
    logger.response.error("Invalid user session " + error.message);
    res.status(404).send({ err: "Invalid user session" });
    return;
  }
  db.query(
    CANCEL_SPORTS_BOOKING,
    [req.body.booking_id, req.body.s_name],
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
        logger.response.info("Cancellation request for booking details : " +  JSON.stringify(result));
        res.send(result);
      }
    }
  );
};

const getSportsHistory = (req, res) => {
  logger.request.info("Getting sports booking history");
  if (!req.session.user) {
    logger.response.error("Invalid user session");
    res.status(404).send({ err: "Invalid user session" });
    return;
  }
  db.query(GET_SPORTS_HISTORY, [req.session.user.user_id], (error, result) => {
    if (error) {
      logger.response.error(
        "Error in fetching booking history " + error.message
      );
      res.status(404).send({ err: error.code });
    } else if (result.length == 0) {
      logger.response.info("No booking history to show");
      res.send([]);
    } else {
      logger.response.info("Booking history : " +  JSON.stringify(result));
      res.send(result);
    }
  });
};

module.exports = {
  getAllSports,
  getBookingSlot,
  sportsBookingInsert,
  cancelSportsBooking,
  getSportsHistory,
};
