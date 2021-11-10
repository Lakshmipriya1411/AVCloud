const SQL_ADMIN = {
  GET_PENDING_USER_LIST: "select u.user_id, u.f_name, u.l_name, u.street, u.zip_code, u.city, u.status, m.membership_type, mt.name as 'membership_name', \
                          DATE_FORMAT(m.start_date,'%Y-%m-%d') as start_date, DATE_FORMAT(m.end_date,'%Y-%m-%d') as end_date from user u\
                          inner join member m on u.user_id = m.user_id\
                          inner join membership_type mt on m.membership_type = mt.type_id\
                          where status = 'Pending';",

  GET_USER_BY_ID: "select u.user_id, u.f_name, u.l_name, u.email_id, u.street, u.zip_code, u.city, u.status, u.auth_id,\
                  m.membership_type, mt.name as 'membership_name',\
                  DATE_FORMAT(m.start_date,'%Y-%m-%d') as start_date,\
                  DATE_FORMAT(m.end_date,'%Y-%m-%d') as end_date \
                  from user u\
                  left join member m on u.user_id = m.user_id\
                  left join membership_type mt on m.membership_type = mt.type_id\
                  where u.user_id = ? ;",

GET_DEPENDENT_LIST:"select * from member m left join dependent d on m.user_id = d.user_id where m.user_id = ? ;",
                  
  GET_USER_LIST: "select u.user_id, u.f_name, u.l_name, u.street, u.zip_code, u.city, u.email_id, u.auth_id, u.status, m.membership_type,  mt.name as 'membership_name',\
                  DATE_FORMAT(m.start_date,'%Y-%m-%d') as start_date, DATE_FORMAT(m.end_date,'%Y-%m-%d') as end_date from user u \
                  inner join member m on u.user_id = m.user_id \
                  inner join membership_type mt on m.membership_type = mt.type_id\
                  where status not like 'Pending';",

  APPROVE_USER: "update user set status = 'Active' where user_id = ? and (status = 'Pending' or status = 'Expired');",


  DELETE_USER: "update user set status = 'Expired' where user_id = ?",

  // _userId,_isAdmin,_street,_city,_zipCode,_startDate,_endDate,_membershipType
  UPDATE_USER_DETAILS: "CALL updateUserDetails(?, ?, ?, ?, ?, ?, ?, ?);",

  CREATE_ADMIN: "INSERT INTO countryclub.user(f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES (?,?,?,?,?,?,?, 1, 'Active');",

  GET_ADMIN_LIST: "select u.user_id, u.f_name, u.l_name, u.email_id, u.status from user u \
                  where auth_id = 1;",

  GET_ADMIN_BY_ID: "select u.user_id, u.f_name, u.l_name, u.email_id, u.street, u.zip_code, u.city, u.auth_id, u.status from user u \
                  where auth_id = 1 and ;",

  DELETE_DEPENDENT: "delete from dependent where user_id = ? and name = ?;",

  INSERT_DEPENDENT: "insert into dependent (user_id, name, relationship) values (?, ?, ?);",

  ADD_UPGRADE_REQ: "insert into upgrade_request (user_id, current_mem_type, upgrade_mem_type) values (?, ?, current_mem_type + 1);",

  GET_UPGRADE_REQ: "select r.user_id, f_name, l_name, r.upgrade_mem_type, mt.name  as upgrade_name, r.current_mem_type from upgrade_request r \
                      inner join user u on u.user_id = r.user_id \
                      left join membership_type mt on r.upgrade_mem_type = mt.type_id \
                      where req_status = 'Pending';",

    //_userId, _currentMem
  APPROVE_UPGRADE_REQ: "CALL upgradeMembership(?, ?);"
  };

 
 
  // auth_id: 0-user, 1-admin
  
  module.exports = SQL_ADMIN;
  