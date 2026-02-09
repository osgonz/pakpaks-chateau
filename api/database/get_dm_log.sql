DELIMITER //
CREATE OR REPLACE PROCEDURE get_dm_log
(log_id UUID)
READS SQL DATA
BEGIN
    SELECT id,
        title,
        timestamp,
        location,
        lengthHours,
        serviceHours,
        description
    FROM dmlog
    WHERE id = log_id;
END; //
DELIMITER ;