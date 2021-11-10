const SPORTS_SECTION ={
    GET_ALL_SPORTS : "select sport_id,s_name,start_time,end_time,venue_name from sports join venue on sports.venue_id=venue.venue_id;",
  
    GET_SPORT_BOOKING_SLOT: "select sports.sport_id, s_name, time_slot.ts_id, time_slot.start_time, time_slot.end_time, venue.venue_name \
                              from sports , time_slot, sport_time, venue \
                              where sports.sport_id = ? and sport_time.sport_id = ? \
                              and time_slot.ts_id=sport_time.ts_id \
                              and sports.venue_id=venue.venue_id \
                              and time_slot.ts_id not in (select ts_id from sports_booking where booking_date = ? and status='Booked') ;",

    SPORTS_BOOKING_INSERT : "insert into sports_booking(status,booking_date,sport_id,user_id,ts_id) values(?,?,?,?,?);",

    CANCEL_SPORTS_BOOKING : "Update countryclub.sports_booking set status='Cancelled' where booking_id=? and sport_id in ( select sport_id from sports where s_name= ?);",

    GET_SPORTS_HISTORY : "select booking_id, s_name , DATE_FORMAT(booking_date,'%Y-%m-%d') as 'booking_date',time_slot.start_time, time_slot.end_time ,status from sports_booking ,sports, time_slot \
                          where time_slot.ts_id = sports_booking.ts_id \
                          and sports_booking.sport_id = sports.sport_id \
                          and user_id=? \
                          order by booking_id;",

};
  
  module.exports = SPORTS_SECTION;