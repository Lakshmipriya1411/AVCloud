const SQL_USER_EVENTS = {
    GET_EVENTS_LIST: "select e.event_id,e.event_name,DATE_FORMAT(e.start_date,'%Y-%m-%d') as 'start_date',DATE_FORMAT(e.end_date,'%Y-%m-%d') as end_date,e.status,CASE WHEN no_of_participants is null THEN e.capacity ELSE (e.capacity-e.no_of_participants)  END  as capacity,v.venue_name from event e join venue v on e.venue_id = v.venue_id;",
    UPDATE_EVENTS: "update event  SET no_of_participants = CASE WHEN no_of_participants is null THEN ? ELSE no_of_participants + ? END where event_id = ?;",
    UPDATE_USER_EVENTS: "CALL update_Events(?,?,?,@ret_value); select @ret_value;",
    CANCEL_EVENTS_BOOKING: "Update countryclub.event_booking eb,event e \
                            inner join event_booking on e.event_id=event_booking.event_id \
                            set eb.status='Cancelled', \
                            e.no_of_participants = case when e.no_of_participants is null then 0 else \
                            e.no_of_participants-eb.no_of_participants end\
                            where eb.booking_id=? and eb.user_id= ? and e.event_id=?;",

    GET_EVENTS_HISTORY: "select booking_id,event.event_id, event_name , DATE_FORMAT(booking_date,'%Y-%m-%d') as 'booking_date',DATE_FORMAT(event.start_date,'%Y-%m-%d') as start_date, DATE_FORMAT(event.end_date,'%Y-%m-%d') as end_date ,event_booking.status,event_booking.no_of_participants from event_booking ,event \
                          where event_booking.event_id = event.event_id \
                          and user_id=? \
                          order by booking_id;",

};
module.exports = SQL_USER_EVENTS;