const db = require("../database/dbConnector");
const logger = require("../modules/logger");
const {
  GET_DINING_DETAILS,
  CREATE_DINING_REGSERVATION,
  GET_RESERVATIONS,
  GET_AVAILABLE_DINING_DETAILS,
  CANCEL_RESERVATION,
  CHECK_AVAILABILITY,
} = require("../database/SQL/Dining/diningSql");

const getReservations = (req, res) => {
  logger.request.info("Get Reseravations");
  if (!req.session.user) {
    res.status(404).send({ err: "Invalid user session" });
    return;
  }
  db.query(GET_RESERVATIONS, [req.session.user.user_id], (error, result) => {
    if (error) {
      res.status(404).send({ err: error.code });
      return;
    } else if (result.length == 0) {
      res.send([]);
    } else {
      res.send(result);
    }
  });
};

const cancelReservation = (req, res) => {
  logger.request.info("Cancel Reservation");
  db.query(CANCEL_RESERVATION, [req.query.reservationid], (error, result) => {
    if (error) {
      res.status(404).send({ err: error.code });
      return;
    } else if (result.length == 0) {
      res.send([]);
    } else {
      res.send(result);
    }
  });
};

const getAvailableDiningDetails = (req, res) => {
  logger.request.info("Get available dining details");
  db.query(GET_AVAILABLE_DINING_DETAILS, [req.query.date], (error, result) => {
    if (error) {
      res.status(404).send({ err: error.code });
      return;
    } else if (result.length == 0) {
      res.send([]);
    } else {
      res.send(result);
    }
  });
};

const checkAvailability = (req, res) => {
  logger.request.info("checking available slots - dining");
  db.query(
    CHECK_AVAILABILITY,
    [req.body.date, req.body.id],

    (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
        return;
      } else if (result.length == 0) {
        res.send([]);
      } else {
        res.send(result);
      }
    }
  );
};

const createReservation = (req, res) => {
  logger.request.info("Create a reservation");
  if (!req.session.user) {
    res.status(404).send({ err: "Invalid user session" });
    return;
  }

  db.query(
    CREATE_DINING_REGSERVATION,
    [
      req.body.reservation_date,
      req.body.status,
      req.body.no_of_ppl,
      req.session.user.user_id,
      req.body.dining_id,
    ],
    (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
        return;
      } else if (result.length == 0) {
        res.send([]);
      } else {
        res.send(result);
      }
    }
  );
};

//router.route("/dining/create").post(CreateReservation);

module.exports = {
  getReservations,
  createReservation,
  getAvailableDiningDetails,
  cancelReservation,
  checkAvailability,
};
