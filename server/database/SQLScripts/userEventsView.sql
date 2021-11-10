USE countryclub;
DROP VIEW IF EXISTS user_events;
  
CREATE ALGORITHM=MERGE VIEW user_events(
    event_id, 
    event_name, 
    start_date, 
    end_date,
    status,
    venue_id,
    capacity,
    no_of_participants
) AS
SELECT 
    event_id,event_name,start_date,end_date,status,venue_id,capacity,no_of_participants
FROM event
WITH CASCADED CHECK OPTION;

