const db = require("../database/dbConnector");
const logger = require("../modules/logger");

const {
  PARTY_GET_VENUE,
  PARTY_INSERT,
  PARTY_MYBOOKINGS,
  PARTY_CANCEL,
  PARTY_CHECK_AVAILABILITY,
} = require("../database/SQL/Party/privatePartySQL");
const { v4: uuidv4 } = require("uuid");

const partyGetVenues = (req, res) => {
  logger.request.info("get available party venues ");
  db.query(
    PARTY_GET_VENUE,
    ["private_party", req.query.date, req.query.date],
    (error, result) => {
      if (error) {
        logger.response.error("Error in fetching venues : " + error.message);
        res.status(404).send({ err: error.code });
        return;
      } else if (result.length == 0) {
        logger.response.info("available venues: " + JSON.stringify(result));
        logger.response.info("No venues available");
        res.send([]);
      } else {
        logger.response.info("available venues: " + JSON.stringify(result));
        res.send(result);
      }
    }
  );
};

const partyInsert = (req, res) => {
  logger.request.info("Insert new party : ");
  if (!req.session.user) {
    logger.response.error("invalid user session");
    res.status(404).send({ err: "Invalid user session" });
    return;
  }
  db.beginTransaction(function (err) {
    if (err) {
      sendError(req, res, "sql error: ", err.code);
      return;
    }
    db.query(
      PARTY_CHECK_AVAILABILITY,
      [
        req.body.venue_id,
        req.body.start_date,
        req.body.end_date,
        req.body.start_date,
        req.body.end_date,
      ],
      (error, result) => {
        if (error) {
          db.rollback();
          logger.response.error("error in fetching data : " + error.message);
          res.status(404).send({ err: "Error in fetching data" });
          return;
        } else if (result[0]["count(*)"] > 0) {
          logger.response.info("result: " + JSON.stringify(result));
          db.commit();
          res
            .status(404)
            .send({ err: "Selected dates not available to book the venue" });
          return;
        } else {
          db.query(
            PARTY_INSERT,
            [
              req.session.user.user_id,
              req.body.event_name,
              req.body.venue_id,
              req.body.start_date,
              req.body.end_date,
              req.body.no_of_attendees,
            ],
            (error, result) => {
              if (error) {
                logger.response.error(
                  "error in fetching data : " + error.message
                );
                db.rollback();
                res.status(404).send({ err: error.code });
                return;
              } else if (result.length == 0) {
                db.commit();
                logger.response.info("result: " + JSON.stringify(result));
                res.send([]);
              } else {
                db.commit();
                logger.response.info("result: " + JSON.stringify(result));
                res.send(result);
              }
            }
          );
        }
      }
    );
  });
};

const partyGetBookings = (req, res) => {
  logger.request.info("Party booking history");
  if (!req.session.user) {
    logger.response.error("invalid user session");
    res.status(404).send({ err: "Invalid user session" });
    return;
  }
  db.query(PARTY_MYBOOKINGS, [req.session.user.user_id], (error, result) => {
    if (error) {
      logger.response.error("error in fetching data: " + error.message);
      res.status(404).send({ err: error.code });
    } else if (result.length == 0) {
      logger.response.info("result: " + JSON.stringify(result));
      res.send([]);
    } else {
      logger.response.info("result: " + JSON.stringify(result));
      res.send(result);
    }
  });
};

const cancelParty = (req, res) => {
  logger.request.info("Cancel party: ");
  if (!req.session.user) {
    logger.response.error("invalid user session");
    res.status(404).send({ err: "Invalid user session" });
    return;
  }
  db.query(PARTY_CANCEL, [req.body.party_id], (error, result) => {
    if (error) {
      logger.response.error("error in fetching data: " + error.message);
      res.status(404).send({ err: error.code });
    } else {
      logger.response.info("result: " + JSON.stringify(result));
      res.send(result);
    }
  });
};

const sendError = (req, res, log, code) => {
  logger.response.info(log + code);
  res.status(404).send({ err: code });
};

module.exports = {
  partyGetVenues,
  partyInsert,
  partyGetBookings,
  cancelParty,
};
