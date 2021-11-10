const db = require("../database/dbConnector");
const sendEmail = require("../database/emailConnector");
const SQL_EVENTS = require("../database/SQL/Admin/eventSql");
const SQL_USER_EVENTS = require("../database/SQL/User/userSql");
const logger = require('../modules/logger');

const getEvents = (req, res) => {
    logger.request.info("get events list");
    db.query(SQL_EVENTS.GET_EVENTS_LIST, (error, results, fields) => {
        if (error) {
            logger.request.error("get events list error " + error.message);
            return console.error(error.message);
        }
        logger.response.info("events list : " + results);
        res.send(results);
    });
}

const createEvent = (req, res) => {
    logger.request.info("create new event");
    const {
        event_name,
        e_description,
        start_date,
        end_date,
        status,
        venue_id,
        capacity,
        organized_by
    } = req.body.eventDetails;
    db.query(
        SQL_EVENTS.CREATE_EVENT, [
            event_name,
            e_description,
            start_date,
            end_date,
            status,
            venue_id,
            capacity,
            organized_by
        ],
        (error, result) => {
            if (error) {
                logger.request.error("create new event error " + error.message);
                console.log(error);
                res.status(404).send({
                    err: error.errno === 1062 ? "Error creating new event" : error.code
                });
            } else {
                logger.response.info("create new event success: " + result);
                res.status(200).send({ success: true });
            }
        }
    )


}

const readEvent = (req, res) => {
    logger.request.info("read event with id: " + req.params.id);
    let event_id = req.params.id;
    db.query(SQL_EVENTS.READ_EVENT, [event_id], (error, results, fields) => {
        if (error) {
            logger.request.error("read event error: " + error.message);
            return console.error(error.message);
        }
        logger.response.info("read event success: " + results[0]);
        res.send(results[0]);
    });
}

const getVenue = (req, res) => {
    logger.request.info("get venue list");
    db.query(SQL_EVENTS.GET_VENUE, (error, results, fields) => {
        if (error) {
            logger.request.error("get venue list error: " + error.message);
            return console.error(error.message);
        }
        logger.response.info("get venue list success: " + results);
        res.send(results);
    });
}

const updateEvent = (req, res) => {
    logger.request.info("update event");
    const {
        event_name,
        e_description,
        start_date,
        end_date,
        status,
        venue_id,
        capacity,
        event_id
    } = req.body;
    db.query(SQL_EVENTS.UPDATE_EVENT, [
        event_name,
        e_description,
        start_date,
        end_date,
        status,
        venue_id,
        capacity,
        event_id
    ], (error, results, fields) => {

        if (error) {
            logger.request.error("update event error: " + error.message);
            console.log(error);
            res.status(404).send({
                err: error.errno === 1062 ? "Error updating event" : error.code
            });
        }
        logger.response.info("update event success: " + results);
        res.send(results);
    });
}


const deleteEvent = (req, res) => {
    logger.request.info("delete event");
    const {
        event_id
    } = req.body;
    db.query(SQL_EVENTS.DELETE_EVENT, [
        event_id,event_id
    ], (error, results, fields) => {
        if (error) {
            logger.request.error("delete event error: " + error.message);
            console.log(error);
            res.status(404).send({
                err: error.errno === 1062 ? "Error deleting event" : error.code
            });
        }
        db.query(SQL_EVENTS.GET_USER_EMAIL, [
            event_id
        ], (error, results, fields) => {
            if (error) {
                logger.request.error("delete event error: " + error.message);
                console.log(error);
                res.status(404).send({
                    err: error.errno === 1062 ? "Error deleting event" : error.code
                });
            }
            if (results.length > 0) {
                sendEmail(results);
            }
        });
        logger.response.info("delete event success: " + results);
        res.send({ message: "deleted" });
    });
}


module.exports = {
    createEvent,
    getEvents,
    readEvent,
    getVenue,
    updateEvent,
    deleteEvent
};