const SQL_USER = {
    GET_USER_DETAILS: "SELECT * FROM user WHERE user_id = ?;",
    USER_REGISTER: "INSERT INTO user(f_name, l_name, email_id, street, city, zip_code, password) VALUES (?,?,?,?,?,?,?);",
    GET_MEMBERSHIP_TYPES: "select * from membership_type;",
    INSERT_MEMBER: "insert into member(user_id, membership_type,start_date, end_date) VALUES(?,?,?,?)",
    INSERT_DEPENDENT: "insert into dependent(user_id, name,relationship) VALUES ?",
    SET_EXPIRED: "update user set status = 'Expired' where user_id = ?",
    MEMBER_GET: "select * from member where user_id = ?",
};
module.exports = SQL_USER;