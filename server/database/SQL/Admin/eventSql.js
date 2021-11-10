const SQL_EVENT = {
    GET_EVENTS_LIST: "SELECT event_id,event_name,e_description,DATE_FORMAT(start_date,'%Y-%m-%d') as 'start_date' ,DATE_FORMAT(end_date,'%Y-%m-%d') as 'end_date', \
                      status FROM countryclub.event",
    
    CREATE_EVENT: "INSERT INTO countryclub.event(event_name, e_description, start_date, end_date, status, venue_id, capacity, organized_by) VALUES (?,?,?,?,?,?,?,?)",
    
    READ_EVENT: "SELECT event_id,event_name,e_description, DATE_FORMAT(start_date,'%Y-%m-%d') as 'start_date',DATE_FORMAT(end_date,'%Y-%m-%d') as 'end_date', \
                 status,countryclub.event.venue_id,venue_name,capacity,no_of_participants,organized_by from \
                 countryclub.event,countryclub.venue where countryclub.event.venue_id=countryclub.venue.venue_id and event_id=?",
    
    UPDATE_EVENT: "UPDATE countryclub.EVENT SET event_name=?,e_description=?,start_date=?,end_date=?,status=?,venue_id=?,capacity=? \
                   where event_id=?",
    
    DELETE_EVENT: "Update countryclub.EVENT set status='Cancelled' where event_id=?; update event_booking set status = 'Cancelled' where event_id = ?;",

    GET_VENUE: "SELECT * FROM venue",

    GET_USER_EMAIL: "SELECT email_id,f_name, l_name, event_name from user \
                     inner join event_booking on user.user_id=event_booking.user_id \
                     inner join event on event.event_id=event_booking.event_id \
                     where event.event_id=?"
  };
  // status: 0-inactive, 1- active, 2-expired 
  // auth_id: 0-user, 1-admin
  
  module.exports = SQL_EVENT;
  