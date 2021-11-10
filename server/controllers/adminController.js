const db = require("../database/dbConnector");
const SQL_ADMIN = require("../database/SQL/Admin/adminSql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const logger = require('../modules/logger');

const getPendingUsers = (req, res) => {
    logger.request.info("get pending user requests");
    db.query(SQL_ADMIN.GET_PENDING_USER_LIST, (error, rows, fields) => {
        if (error) {
          logger.request.info("get pending user requests error: " + error.message);
          return console.error(error.message);
        }
        logger.response.info("get pending user requests: successful.");
        res.send(rows);
    });
}

const getUsers = (req, res) => {
  logger.request.info("get user list");
    db.query(SQL_ADMIN.GET_USER_LIST, (error, rows, fields) => {
        if (error) {
          logger.request.info("get user list error: " + error.message);
          return console.error(error.message);
        }
        logger.response.info("get user list: successful.");
        res.send(rows);
    });
}

const getUsersById = (req, res) => {
  let user_id=req.params.id;

  logger.request.info("get user by Id: " + user_id);
    
    db.query(SQL_ADMIN.GET_USER_BY_ID,[user_id], (error, rows, fields) => {
        if (error) {
          logger.request.info("get user by Id error: " + error.message);
          return console.error(error.message);
        }
        logger.response.info("get user by Id : successful.");
        res.send(rows[0]);
    });
}

const approvePendingUser = (req,res) =>{
    const {
      user_id
    } = req.body;

    logger.request.info("activate membership: " + user_id);

    db.query(SQL_ADMIN.APPROVE_USER,[user_id], (error,result,fields) =>{
        if(error){
          console.log(error);
          logger.request.info("activate membership error: " + error.message);
          res.status(404).send({
              err: error.errno === 1062 ? "Error approving user" : error.code
          });
        }else{
          logger.response.info("activate membership: successful.");
        res.status(200).send({ success: true });
        }
    })
}

const deleteUser = (req,res) =>{
    const {
      user_id
    } = req.body;

    logger.request.info("delete user: " + user_id);

    db.query(SQL_ADMIN.DELETE_USER,[user_id], (error,result,fields) =>{
        if(error){
          console.log(error);
          logger.request.info("delete user error: " + error.message);
          res.status(404).send({
              err: error.errno === 1062 ? "Error deleting user" : error.code
          });
        }
        logger.response.info("delete user: successful.");
        res.status(200).send({ success: true });
    })
}

const updateUser = (req,res) =>{
    const {
        userId,
        isAdmin,
        street,
        city,
        zip_code,
        start_date,
        end_date,
        membership_type
      } = req.body;

      logger.request.info("update user details: " + userId);

    db.query(SQL_ADMIN.UPDATE_USER_DETAILS,
        [
          userId,
          isAdmin,
          street,
          city,
          zip_code,
          start_date,
          end_date,
          membership_type
         ], (error, results, fields) => {

        if (error) {
            console.log(error);
            logger.request.info("update user details error: " + error.message);
            res.status(404).send({
                err: error.errno === 1062 ? "Error updating event" : error.code
            });
        } else {
          logger.response.info("update user details: successful.");
            res.status(200).send({ success : true });
        }
    });
}

const createNewAdmin =(req,res) =>{
  const {
        first_name,
        last_name,
        street,
        zip_code,
        city,
        email_id,
        password,
      } = req.body.userDetails;

      logger.request.info("create new admin");
      
      // Hash password before store in database
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
          console.log(error);
          logger.request.info("create new admin - bcrypt error: " + error.message);
          res.status(404).send({ err: error.message });
          return;
        } else {
          db.query(
            SQL_ADMIN.CREATE_ADMIN,
            [
              first_name,
              last_name,
              email_id,
              street,
              city,
              zip_code,
              hash,
            ],
            (error, result) => {
              if (error) {
                console.log(error);
                logger.request.info("create new admin - creation error: " + error.message);
                res.status(404).send({
                  err: error.errno === 1062 ? "Username already exists" : error.code,
                });
              } else {
                logger.response.info("create new admin : successful.");
                res.send({ success: true, user_id: result.insertId });
              }
            }
          );
        }
      });
}

const getAdminList = (req, res) => {
  logger.request.info("get admin list");
  db.query(SQL_ADMIN.GET_ADMIN_LIST, (error, rows, fields) => {
      if (error) {
        logger.request.info("get admin list error: " + error.message);
        return console.error(error.message);
      }
      logger.response.info("get admin list: successful.");
      res.send(rows);
  });
}

const getDependents = (req, res) => {
  logger.request.info("get dependent list");
  let user_id=req.params.id;
  db.query(SQL_ADMIN.GET_DEPENDENT_LIST, [user_id], (error, rows, fields) => {
    if (error) {
      logger.request.info("get dependent list error: " + error.message);
      return console.error(error.message);
    }
    logger.response.info("get dependent list: successful.");
    res.send(rows);
});
}

const deleteDependent = (req, res) => {
  const {
    user_id,
    d_name
  } = req.body;

  logger.request.info("delete dependent: " + user_id + ", " + d_name);

  db.query(SQL_ADMIN.DELETE_DEPENDENT,[user_id, d_name], (error,result,fields) =>{
      if(error){
        console.log(error);
        logger.request.info("delete dependent error: " + error.message);
        res.status(404).send({
            err: error.errno === 1062 ? "Error deleting dependent" : error.code
        });
      }
      logger.response.info("delete dependent: successful.");
      res.status(200).send({ success: true });
  })
}

const addNewDependent = (req, res) => {
  const {
    user_id,
    d_name,
    relationship
  } = req.body;

  logger.request.info("add dependent: " + user_id + ", " + d_name + ", " + relationship);

  db.query(
    SQL_ADMIN.INSERT_DEPENDENT,
    [
      user_id,
      d_name,
      relationship
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        logger.request.info("add dependent error: " + error.message);
        res.status(404).send({
          err: error.errno === 1062 ? "Dependent already exists" : error.code,
        });
      } else {
        logger.response.info("add dependent: successful.");
        res.send({ success: true});
      }
    }
  );
}

const getUpgradeReq = (req, res) => {
  logger.request.info("get upgrade user list");
    db.query(SQL_ADMIN.GET_UPGRADE_REQ, (error, rows, fields) => {
        if (error) {
          logger.request.info("get  upgrade user list error: " + error.message);
          return console.error(error.message);
        }
        logger.response.info("get  upgrade user list: successful.");
        res.send(rows);
    });
}

const addUpgradeReq = (req, res) => {
  const {
    user_id,
    c_mem_type
  } = req.body;

  logger.request.info("add upgrade request: " + user_id + ", " + c_mem_type);

  db.query(
    SQL_ADMIN.ADD_UPGRADE_REQ,
    [
      user_id,
      c_mem_type
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        logger.request.info("add upgrade request error: " + error.message);
        res.status(404).send({
          err: error.errno === 1062 ? "Upgrade request already exists" : error.code,
        });
      } else {
        logger.response.info("add upgrade request: successful.");
        res.send({ success: true});
      }
    }
  );
}

const approveUpgradeReq = (req,res) =>{
  const {
    user_id,
    c_mem_type
  } = req.body;

  logger.request.info("approve membership upgrade: " + user_id + ", " + c_mem_type);

  db.query(SQL_ADMIN.APPROVE_UPGRADE_REQ,
    [
      user_id,
      c_mem_type
    ],
     (error,result,fields) =>{
      if(error){
        console.log(error);
        logger.request.info("approve membership upgrade error: " + error.message);
        res.status(404).send({
            err: error.errno === 1062 ? "Error approving user" : error.code
        });
      }else{
        logger.response.info("approve membership upgrade: successful.");
      res.status(200).send({ success: true });
      }
  })
}

module.exports = {
    getPendingUsers,
    getUsers,
    getUsersById,
    approvePendingUser,
    deleteUser,
    updateUser,
    createNewAdmin,
    getAdminList,
    getDependents, 
    deleteDependent,
    addNewDependent,
    getUpgradeReq,
    addUpgradeReq,
    approveUpgradeReq
};
