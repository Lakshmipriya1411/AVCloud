const bcrypt = require("bcrypt");
const db = require("../database/dbConnector");
const SQL_USER = require("../database/SQL/User/userSql");
const saltRounds = 10;
const logger = require("../modules/logger");

const getLogin = (req, res) => {
  logger.request.info("Validate session");
  if (req.session.user) {
    logger.response.info("Valid : " + JSON.stringify(req.session.user));
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    logger.response.info("loggedIn " + false);
    res.send({ loggedIn: false });
  }
};

const logout = (req, res) => {
  logger.request.info("logout");
  if (req.session.user) {
    logger.response.info("destroyed session");
    req.session.destroy();
    req.session = null;
    res.send("hello");
  }
};

const setLogin = (req, res) => {
  logger.request.info("Set login & session");
  const user_id = req.body.user_id;
  const password = req.body.password;
  let auth_id;
  if (req.session.user) {
    logger.response.error("Already logged in ");
    res.send({ message: "already logged in" });
  } else {
    db.query(SQL_USER.GET_USER_DETAILS, user_id, (err, result) => {
      if (err) {
        sendError(req, res, "sql error: " + err.code);
        return;
      } else if (result.length > 0) {
        if (result[0].status == "Pending") {
          sendError(req, res, "status : ", "Contact Admin for approval");
          return;
        }
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            auth_id = result[0].auth_id[0];
            if (auth_id == 0) {
              getMemberDetails(req, res, user_id, auth_id);
            } else {
              setSession(req, res, user_id, auth_id, 2);
            }
          } else {
            logger.response.error("Wrong username/password combination!");
            res
              .status(404)
              .send({ err: "Wrong username/password combination!" });
          }
        });
      } else {
        logger.response.error("user doesnt exist : ");
        res.status(404).send({ err: "User doesn't exist" });
      }
    });
  }
};

const getMemberDetails = (req, res, user_id, auth_id) => {
  let membership_type;
  db.beginTransaction(function(err){
    if(err){
      sendError(req, res, "sql error: ", err.code);
      return;
    }
    db.query(SQL_USER.MEMBER_GET, user_id, (err, result) => {
      if (err) {
        db.rollback();
        sendError(req, res, "sql error: ", err.code);
        return;
      }
      membership_type = result[0].membership_type;
      if (
        result[0].status == "Expired" ||
        new Date(result[0].end_date) < new Date()
      ) {
        if (
          result[0].status != "Expired" &&
          new Date(result[0].end_date) < new Date()
        ) {
          db.query(SQL_USER.SET_EXPIRED, user_id, (err, result) => {
            if (err) {
              db.rollback();
              logger.response.error("sql exception " + err.code);
            }
          });
        }
        db.commit();
        logger.response.info("Membership Expired. Contact Admin for extension");
        res.status(404).send({
          err: "Membership Expired. Contact Admin for extension",
        });
        return;
      } else {
        db.commit();
        setSession(req, res, user_id, auth_id, membership_type);
      }
    });
  })
};

const setSession = (req, res, user_id, auth_id, membership_type) => {
  req.session.user = {
    user_id: user_id,
    auth_id: auth_id,
    membership_type: membership_type,
  };
  res.send({
    user_id: user_id,
    auth_id: auth_id,
    membership_type: membership_type,
  });
};

const registerUser = (req, res) => {
  logger.request.info("register new user: ");
  let insertId = "";
  let start_date = new Date();
  start_date = start_date.toJSON().substr(0, 10);
  let end_date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 6,
    new Date().getDate()
  );
  end_date = end_date.toJSON().substr(0, 10);
  const {
    first_name,
    last_name,
    street,
    zip_code,
    city,
    email_id,
    password,
    membership_type,
  } = req.body.userDetails;
  let dependentList = [];

  // Hash password before store in db
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      sendError(req, res, "error: ", err.message);
      return;
    } else {
      db.beginTransaction(function (err) {
        if (err) {
          sendError(req, res, "sql error: ", err.code);
          return;
        }
        db.query(
          SQL_USER.USER_REGISTER,
          [first_name, last_name, email_id, street, city, zip_code, hash],
          (err, result) => {
            if (err) {
              db.rollback();
              sendError(
                req,
                res,
                "error: ",
                err.errno === 1062 ? "Username already exists" : err.code
              );
              return;
            } else {
              insertId = result.insertId;
              db.query(
                SQL_USER.INSERT_MEMBER,
                [insertId, membership_type, start_date, end_date],
                function (err, result) {
                  if (err) {
                    db.rollback();
                    sendError(req, res, "error: ", err.code);
                    return;
                  }
                  if (membership_type == 1 || membership_type == 2) {
                    req.body.dependentsInfo.forEach((element) => {
                      dependentList.push([
                        insertId,
                        element.name,
                        element.relationship,
                      ]);
                    });
                  }
                  if (membership_type == 0) {
                    commitTransaction(req, res, insertId);
                  } else {
                    if (dependentList.length > 0) {
                      db.query(
                        SQL_USER.INSERT_DEPENDENT,
                        [dependentList],
                        (err, result) => {
                          if (err) {
                            db.rollback();
                            sendError(req, res, "sql error : ", err.code);
                            return;
                          }
                          logger.response.info("commit");
                          commitTransaction(req, res, insertId);
                        }
                      );
                    } else {
                      commitTransaction(req, res, insertId);
                    }
                  }
                }
              );
            }
          }
        );
      });
    }
  });
};

const sendError = (req, res, log, code) => {
  logger.response.info(log + code);
  res.status(404).send({ err: code });
};

const commitTransaction = (req, res, insertId) => {
  db.commit(function (err) {
    if (err) {
      db.rollback();
      logger.response.error("error : " + err.code);
      res.status(404).send({
        err: err.code,
      });
      return;
    }
    logger.response.info("sucess user_id = " + insertId);
    res.status(200).send({ success: true, user_id: insertId });
  });
};

const getMembershipTypes = (req, res) => {
  logger.request.info("get membership types");
  db.query(SQL_USER.GET_MEMBERSHIP_TYPES, [], (error, result) => {
    if (error) {
      logger.response.error("sql error: " + error.message);
      res.status(404).send({ err: error.message });
    } else {
      logger.response.info("result : " + JSON.stringify(result));
      res.status(200).send(result);
    }
  });
};

module.exports = {
  getLogin,
  registerUser,
  logout,
  setLogin,
  getMembershipTypes,
};
