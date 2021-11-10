USE countryclub;
DELIMITER $$
DROP PROCEDURE IF EXISTS create_user_events_index;
CREATE PROCEDURE create_user_events_index()
BEGIN
	DECLARE IndexCount INT;
    SELECT COUNT(1)
    FROM INFORMATION_SCHEMA.STATISTICS 
    WHERE table_schema = "countryclub" 
    AND   table_name   = "event"
    AND   index_name   = "idx_userevents";   
    IF IndexCount = 0 THEN  
		CREATE UNIQUE INDEX idx_userevents ON event (event_id);
	ELSE 
		DROP INDEX idx_userevents on event;
        CREATE UNIQUE INDEX idx_userevents ON event (event_id);
    END IF;
    
END$$

DELIMITER ;

