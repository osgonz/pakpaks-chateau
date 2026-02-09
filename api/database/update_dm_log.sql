DELIMITER //
CREATE OR REPLACE PROCEDURE update_dm_log
(
    log_id UUID,
    title VARCHAR(100),
    timestamp DATETIME,
    location VARCHAR(100),
    length_hours INT,
    service_hours INT,
    description TEXT
)
READS SQL DATA
BEGIN
	UPDATE dmlog
    SET title = title,
        timestamp = timestamp,
        location = location,
        lengthHours = length_hours,
        serviceHours = service_hours,
        description = description
    WHERE id = log_id;
END; //
DELIMITER ;