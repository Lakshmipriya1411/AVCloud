const SQL_DINING = {
  GET_RESERVATIONS:
    "select reservation_id,reservation_date,status,no_of_ppl,Type,user_id from reservation left join dining on reservation.dining_id=dining.dining_id where user_id=? order by reservation_date desc",

  CREATE_DINING_REGSERVATION:
    "INSERT INTO countryclub.reservation(reservation_date, status, no_of_ppl, user_id, dining_id) VALUES (?,?,?,?,?);",
  GET_AVAILABLE_DINING_DETAILS:
    "select d.dining_id,d.type,venue.venue_name,d.capacity,d.start_time,d.end_time from dining d inner join countryclub.venue on d.venue_id=venue.venue_id where venue.venue_type='dining' and d.dining_id not in ( select dining.dining_id from dining left join reservation on dining.dining_id=reservation.dining_id where reservation_date=? and reservation.status='Approved' group by dining.dining_id having sum(no_of_ppl)>=max(dining.capacity))",
  // "SELECT dining.dining_id,dining.type,venue.venue_name,dining.capacity,dining.start_time,dining.end_time FROM countryclub.dining left join countryclub.reservation on dining.dining_id=reservation.dining_id inner join countryclub.venue on dining.venue_id=venue.venue_id where reservation_id is null",
  CANCEL_RESERVATION:
    "update countryclub.reservation set reservation.status='Cancelled' where reservation.reservation_id=?;",
  CHECK_AVAILABILITY:
    "select sum(reservation.no_of_ppl) as available from countryclub.reservation where reservation.reservation_date=?  and dining_id=? and reservation.status='Approved'",
};

module.exports = SQL_DINING;
